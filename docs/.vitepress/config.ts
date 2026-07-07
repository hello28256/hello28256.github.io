import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  cleanUrls: true,
  title: 'hello28256',
  description: 'hello28256 的个人主页：技术博客、项目作品集、在线书。',
  lang: 'zh-CN',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ],

  themeConfig: {
    siteTitle: 'hello28256',
    appearance: 'auto',

    nav: [
      { text: '我的阅读', link: 'https://hello28256.github.io/book/', external: true },
      { text: 'Coding', link: 'https://hello28256.github.io/Coding/', external: true },
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