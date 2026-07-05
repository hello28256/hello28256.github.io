---
title: 我的阅读
icon: fas fa-book
order: 6
permalink: /book/
---

<script>
  // 主站本身在 /book/ 路径生成这个占位页。
  // 当 hello28256/book 项目站点的 Pages 启用后，
  // GitHub 会让项目站点接管 /book/ 路径，永远不会访问到这里。
  // 这段 JS 是兜底：如果用户因任何原因落到这一页，立刻跳转。
  if (window.location.pathname.replace(/\/+$/, '') !== '/book') {
    window.location.replace('https://hello28256.github.io/book/');
  }
</script>

<noscript>
  <meta http-equiv="refresh" content="0; url=https://hello28256.github.io/book/">
</noscript>

正在跳转到 [📚 我的阅读](https://hello28256.github.io/book/)...

如果浏览器没有自动跳转，请点击上面的链接。
