/* ----------------------------------------------------------------------------
   主题切换：dark <-> light
   - 默认 dark（与 _config.yml minimal_mistakes_skin: dark 一致）
   - 首次访问：localStorage > prefers-color-scheme（fallback dark）
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
    /* 用户没显式选择，且 matchMedia 不可用 → 默认 dark（与 _config.yml 一致） */
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT;
    }
    return DARK;
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
      var current = document.documentElement.getAttribute('data-theme') || DARK;
      var next = current === DARK ? LIGHT : DARK;
      applyTheme(next);
      setStoredTheme(next);
    });
  });
})();
