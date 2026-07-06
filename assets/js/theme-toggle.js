/* ----------------------------------------------------------------------------
   主题切换：light <-> dark
   - 默认 light（iOS 风格：滑块左 = 关 = 亮色）
   - 首次访问：localStorage > prefers-color-scheme（fallback light）
   - 点击切换按钮：在 light/dark 之间互切，写回 localStorage
   - 必须尽早执行（head 里同步加载）以避免 FOUC
   ---------------------------------------------------------------------------- */
(function () {
  'use strict';

  var STORAGE_KEY = 'mm-theme';
  var DARK = 'dark';
  var LIGHT = 'light';

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* localStorage 被禁用时静默忽略 */
    }
  }

  function getPreferredTheme() {
    var stored = getStoredTheme();
    if (stored === DARK || stored === LIGHT) {
      return stored;
    }
    /* 用户没显式选择，跟随系统；不可用时 fallback light */
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK;
    }
    return LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  /* 第一阶段：DOM 还没解析就尽早设置主题，避免 FOUC */
  applyTheme(getPreferredTheme());

  /* 第二阶段：DOMContentLoaded 后绑定按钮 */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || LIGHT;
      var next = current === LIGHT ? DARK : LIGHT;
      applyTheme(next);
      setStoredTheme(next);
    });
  });
})();
