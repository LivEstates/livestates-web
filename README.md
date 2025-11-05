# Sticky - 标准网站导出说明

本目录为从 MHTML (`Sticky - Mobile App Showcase.mhtml`) 自动导出的静态网站工程：
- 入口文件：`index.html`
- 资源目录：`/assets`
  - `images/`、`css/`、`videos/`、`fonts/`、`js/`

## 本地预览
建议用本地 HTTP 服务器预览（避免浏览器 `file://` 限制）：

```bash
cd /mnt/data/sticky_site
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 替换图片 / 视频
- 已经内联到 `/assets` 的资源可以直接 **同名替换文件**，或者修改 `index.html` 中相应标签的 `src`。
- `assets_manifest.json` 中 `assets_localized` 列出了所有已本地化的资源（含原始 URL）。
- 仍然引用线上资源的清单见 `assets_remote_remaining`（包括视频 mp4、部分图片、Framer 模块脚本等）。
  - 如果需要完全离线，请把这些远程资源下载到 `/assets` 相应目录，并在 `index.html` 中把对应链接改为相对路径。
  - 字体目前通过 Google Fonts 在线加载（`fonts.gstatic.com`）；如需打包离线，需另行下载并在 CSS 中替换。

## 注意
- 页面运行时仍会请求部分 Framer 的在线脚本（`.mjs`）与视频，以保证 **视觉和交互效果与原站一致**。
- 导出代码未经手工重构，保留了 Framer 生成的结构与样式，适合二次替换素材与轻度定制。
- 若需彻底重构为完全离线/可维护的工程，请告诉我，我可以继续把远程依赖也收敛为本地资源。

