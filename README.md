# hello28256.github.io

个人主页 & 技术博客。基于 [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) Jekyll
主题构建，托管在 GitHub Pages。

在线地址：<https://hello28256.github.io>

## 站点结构

- **`_posts/`** — 技术博客（Markdown）
- **`_tabs/`** — 顶部导航页
  - `about.md` — 关于我
  - `coding.md` — 跳转占位，由子站点 [hello28256/Coding](https://github.com/hello28256/Coding) 接管
  - `book.md` — 跳转占位，由子站点 [hello28256/book](https://github.com/hello28256/book) 接管
  - `archives.md` / `categories.md` / `tags.md` — 自动生成
- **`_includes/hero.html`** — 首页 Hero 区（自定义）
- **`_layouts/home.html`** — 首页布局（覆盖主题默认）
- **`_data/`** — 联系方式、分享按钮配置
- **`assets/css/custom.css`** — 主题样式覆盖
- **`assets/img/avatar.png`** — 头像
- **`.github/workflows/pages-deploy.yml`** — GitHub Pages 自动部署

## 本地开发

环境要求：Ruby 3.x、Bundler、Node.js（可选，用于 JS 资源构建）。

```bash
# 安装依赖
bundle install

# 启动开发服务器（默认 http://127.0.0.1:4000）
./tools/run.sh

# 监听所有接口
./tools/run.sh -H 0.0.0.0

# 生产模式构建（校验）
./tools/test.sh
```

VS Code 用户也可以直接 `Cmd/Ctrl + Shift + B` 运行 `Run Jekyll Server` 任务。

### Dev Container

仓库包含 `.devcontainer/`，在 VS Code / GitHub Codespaces 中打开会自动安装 Ruby、Jekyll 和所有依赖。

## 内容修改

| 场景 | 操作 |
| --- | --- |
| 改站名、tagline、社交链接 | 编辑 `_config.yml` |
| 改首页 Hero | 编辑 `_includes/hero.html` |
| 改主题样式 | 编辑 `assets/css/custom.css` |
| 改关于页 | 编辑 `_tabs/about.md` |
| 改 Coding 跳转页 | 编辑 `_tabs/coding.md` |
| 新建博客 | 在 `_posts/` 新建 `YYYY-MM-DD-title.md` |
| 改联系 / 分享按钮 | 编辑 `_data/contact.yml`、`_data/share.yml` |

> 修改 `_config.yml` 后需要重启 `jekyll serve` 才能生效。

## 部署

推送到 `main` 分支即触发 `.github/workflows/pages-deploy.yml`，自动构建并发布到 GitHub Pages。

子路径 `/book/1001Reading/`、`/Coding/1001Coding/` 分别由独立仓库
[hello28256/book](https://github.com/hello28256/book)、
[hello28256/Coding](https://github.com/hello28256/Coding) 通过 GitHub Pages
项目站点提供，DNS 解析到本仓库对应子路径后由子站点接管；`_tabs/book.md`、
`_tabs/coding.md` 中的 JS 仅作兜底跳转。

## 致谢

- 主题：[jekyll-theme-chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)
- 起始模板：[chirpy-starter](https://github.com/cotes2020/chirpy-starter)

## License

本仓库内容（除主题与第三方素材外）以 [MIT](LICENSE) 协议发布。Chirpy 主题本身遵循其上游许可证。
