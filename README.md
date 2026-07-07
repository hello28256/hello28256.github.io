# hello28256.github.io

个人主页 & 技术博客。基于 [VitePress](https://vitepress.dev/) 静态站点框架，托管在 GitHub Pages。

在线地址：<https://hello28256.github.io>

## 站点结构

```
.
├── docs/                          # VitePress 源目录
│   ├── index.md                   # 首页（home layout）
│   ├── about.md                   # 关于页
│   ├── posts/                     # 博客文章
│   │   ├── welcome.md             # 你好，世界
│   │   └── _post-template.md      # 写新文章的模板（下划线开头不发布）
│   ├── public/                    # 静态资源（avatar / favicon）
│   └── .vitepress/                # 站点配置与主题
│       ├── config.ts              # 主配置（nav / sidebar / themeConfig）
│       └── theme/
│           ├── index.ts           # 主题入口
│           └── custom.css         # 品牌色 + 加粗变绿 + 图片居中
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署（pnpm + Node 22）
├── package.json                   # pnpm 工作区 + vitepress 依赖
├── pnpm-lock.yaml
├── LICENSE                        # MIT
└── README.md
```

子路径 `/book/`、`/Coding/1001Coding/` 由独立仓库 [hello28256/book](https://github.com/hello28256/book)、[hello28256/Coding](https://github.com/hello28256/Coding) 通过 GitHub Pages 项目站点提供。

## 本地开发

环境要求：Node.js 22+、[pnpm](https://pnpm.io/) 9+。

```bash
# 安装依赖
pnpm install

# 启动开发服务器（默认 http://localhost:5173）
pnpm docs:dev

# 生产构建（产物在 docs/.vitepress/dist/）
pnpm docs:build

# 本地预览构建产物（默认 http://localhost:4173）
pnpm docs:preview
```

## 内容修改

| 场景 | 操作 |
| --- | --- |
| 改站名、导航、社交链接 | 编辑 `docs/.vitepress/config.ts` |
| 改品牌色 / 加粗颜色 / 图片样式 | 编辑 `docs/.vitepress/theme/custom.css` |
| 改首页 hero / features | 编辑 `docs/index.md` |
| 改关于页 | 编辑 `docs/about.md` |
| 新建博客 | 在 `docs/posts/` 新建 `slug.md`，并在 `config.ts` 的 sidebar 里加一行 |

## 部署

推送到 `main` 分支即触发 `.github/workflows/deploy.yml`，自动构建并发布到 GitHub Pages。

## License

本仓库内容以 [MIT](LICENSE) 协议发布。