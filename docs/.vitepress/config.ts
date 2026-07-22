import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  cleanUrls: true,
  title: 'hello28256',
  description: 'hello28256 的个人主页：技术博客、项目作品集、在线书。',
  lang: 'zh-CN',
  lastUpdated: true,

  head: [
    // HTML 缓存控制：让浏览器和中间代理更倾向于重新验证，避免新增文章后看不到。
    // 注意：meta http-equiv 多数现代浏览器会忽略；真正生效依赖服务器响应头。
    // 这里作为软信号，配合 GitHub Pages 默认 max-age=600，能在大多数情况下更快刷新。
    ['meta', { 'http-equiv': 'Cache-Control', content: 'no-cache, no-store, must-revalidate' }],
    ['meta', { 'http-equiv': 'Pragma', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Expires', content: '0' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    // 缓存绕开：解决"新文章上线后浏览器看不到，要手动刷新"的问题。
    // GitHub Pages 给 / 设的 cache-control: max-age=600，CDN 也缓存。
    // 思路：deploy.yml 写一个 version.json（部署时间戳），HTML 里跑这段：
    //   1. fetch version.json（cache: no-cache 强制回源）
    //   2. 取 URL 上的 ?v= 参数（缺则视作空字符串）
    //   3. 比对：
    //      - URL 没 ?v    → 跳到 ?v=<remote>  强制写版本号
    //      - URL 有但旧   → 跳到 ?v=<remote>  部署后用户停留在旧 URL
    //      - URL 一致     → 不动
    // 用 URL 的 ?v 作真相源（不是 localStorage）——
    // localStorage 会被各种情况污染（手动清缓存、隐身模式、首次访问），
    // 一旦写入正确值就永远'觉得一致'，反而让用户看不到新 HTML。
    // URL 上有 ?v= 是 v1.6.4 之后的修复关键。
    //
    // v1.6.5 增强：fetch 加 ?_<随机数> 强制绕开 CDN/浏览器对 version.json 的
    // 缓存（CDN key 是完整 URL，不同 query 视为不同资源）。否则旧版 fetch
    // 返回旧 version，用户跳到旧 ?v=，老 HTML 自我循环。
    //
    // v1.6.6 增强：原来只在 page load 时跑一次。已经在 tab 里停留了几天、
    // URL 锁在旧 ?v= 的老用户永远不会重新被检查 —— 他们的 tab 显示老 HTML
    // 直到手动刷新。补救：每 INTERVAL_MS 再 fetch 一次 version.json，
    // 不一致就 location.replace。
    // - 间隔 5 分钟：GitHub Pages 自己的 max-age=600 是 10 分钟，
    //   5 分钟轮询比 CDN 兜底还快，能确保最长 5 分钟内老 tab 同步。
    // - 只在 document.visibilityState === 'visible' 时跑，
    //   后台 tab 不浪费请求、不抢 CDN 配额。
    // - 不一致才跳，一致完全无感（不弹窗、不 reload）。
    //
    // endpoint 用 /version.json —— 这个站点 base 是 '/'（user site，不是
    // /book/ 或 /Coding/ project site），不能照抄 ../book 和 ../Coding。
    ['script', {}, `
;(function () {
  var ENDPOINT = '/version.json'
  var INTERVAL_MS = 5 * 60 * 1000

  function check() {
    fetch(ENDPOINT + '?_=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null })
      .then(function (data) {
        if (!data || !data.version) return
        var remote = String(data.version)
        var u = new URL(location.href)
        var current = u.searchParams.get('v') || ''
        if (current !== remote) {
          u.searchParams.set('v', remote)
          location.replace(u.toString())
        }
      })
      .catch(function () { /* 网络失败 / 离线下次再试 */ })
  }

  // 首次执行（写在函数外，page load 时跑一次）
  try { check() } catch (e) { /* localStorage / URL API 被禁时静默 */ }

  // 5 分钟轮询：只在 tab 可见时跑
  setInterval(function () {
    if (document.visibilityState === 'visible') check()
  }, INTERVAL_MS)

  // tab 切回前台时立即补一次 —— 避免用户 "后台放半小时 → 切回来" 这种场景
  // 多等最多 5 分钟
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') check()
  })
})();
`],
  ],

  themeConfig: {
    siteTitle: 'hello28256',
    appearance: 'dark',

    nav: [
      { text: '我的阅读', link: 'https://hello28256.github.io/book/', external: true, target: '_self' },
      { text: 'Coding', link: 'https://hello28256.github.io/Coding/', external: true, target: '_self' },
    ],

    sidebar: {
      '/posts/': [
        {
          text: '文章',
          items: [
            { text: '你好，世界', link: '/posts/welcome' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hello28256' },
    ],

    footer: {
      message: '正文采用 CC BY-SA 4.0 协议',
      copyright: 'Copyright © 2026 hello28256',
    },

    editLink: {
      pattern: 'https://github.com/hello28256/hello28256.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    outline: { level: [2, 3] },
  },

  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '提示',
      detailsLabel: '详细信息',
    },
  },

  // 排除下划线开头的草稿/模板文件（如 _post-template.md）
  srcExclude: ['**/_*.md'],
})
