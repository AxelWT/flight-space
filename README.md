# Flight Space

## 项目结构

```
flight-space/
├── docs/                        # 站点根目录
│   ├── .vitepress/              # VitePress 配置
│   │   └── config.mts           # 站点配置文件
│   ├── guide/                   # 建站指南
│   ├── notes/                   # 笔记
│   ├── read/                    # 阅读
│   ├── about.md                 # 关于
│   └── index.md                 # 首页
├── .github/workflows/deploy.yml # GitHub Actions 部署流程
├── package.json
└── package-lock.json
```

## 快速开始

### 环境要求

- Node.js 20+
- npm

### 安装依赖

```sh
npm install
```

### 开发调试

启动本地开发服务器，支持热更新：

```sh
npm run docs:dev
```

启动后访问 [http://localhost:5173](http://localhost:5173)，修改文件后页面会自动刷新。

### 构建预览

构建静态文件并本地预览最终效果：

```sh
npm run docs:build
npm run docs:preview
```

- `docs:build` — 生成静态文件到 `docs/.vitepress/dist/`
- `docs:preview` — 启动本地服务器预览构建产物

### 部署到自己的 GitHub Pages

如果你想把这个项目部署到你自己的仓库，按以下步骤操作：

#### 1. Fork 或创建仓库

在 GitHub 上 Fork 本仓库，或者新建一个仓库后将代码推上去。

#### 2. 修改站点配置

编辑 `docs/.vitepress/config.mts`，将 `base` 改为你的仓库路径：

```ts
// 将 <你的用户名> 和 <仓库名> 替换为实际值
base: '/<仓库名>/'
```

例如你的仓库是 `https://github.com/zhangsan/my-blog`，则：

```ts
base: '/my-blog/'
```

> 如果使用 `<用户名>.github.io` 作为仓库名（即 `zhangsan.github.io`），则 `base` 设为 `'/'`。

#### 3. 配置 GitHub Pages

1. 进入仓库 **Settings → Pages**
2. **Source** 选择 **GitHub Actions**
3. **Save**

#### 4. 推送代码触发部署

将代码推送到 `main` 分支，GitHub Actions 会自动执行构建和部署：

```sh
git push origin main
```

可以在仓库的 **Actions** 标签页查看部署进度。

#### 5. 访问站点

部署完成后访问：

```
https://<你的用户名>.github.io/<仓库名>/
```

#### 自定义域名（可选）

1. 在 `docs/.vitepress/config.mts` 中添加 `head` 配置指定 CNAME：

```ts
head: [['link', { rel: 'canonical', href: 'https://your-domain.com/' }]]
```

2. 在 `docs/public/` 目录下创建 `CNAME` 文件，内容为你的域名：

```
your-domain.com
```

3. 在仓库 **Settings → Pages → Custom domain** 中填入你的域名，并开启 **Enforce HTTPS**。

4. 在域名服务商处将域名 CNAME 指向 `<你的用户名>.github.io`。

## 写作

在 `docs/` 目录下新建 `.md` 文件即可添加内容。新增页面后需在 `docs/.vitepress/config.mts` 的 `sidebar` 中添加对应条目。

## 主题与首页

站点主题在 `docs/.vitepress/theme/`，风格参考 [lefos.com](https://lefos.com)：暖纸底、衬线正文、零圆角、虚线分隔。

首页有两种风格，可在页面上运行时切换（选择记到 localStorage，参考 VitePress 的深浅色切换方式）：

- **门厅（gate，默认）**：居中 wordmark → 下方一行大写「进入」→ 四角固定的小标签，入场是三者依次淡入（0.5s / 1.5s / 2.9s）。门厅上**没有可见的叶子**，只有窗外树影落在纸面上的斑驳光斑：`dapple.ts` 生成远 / 中 / 近三层影子（越远越模糊、越淡、动得越慢），每簇再拆成两组、节奏与位移方向都不同，所以影子是一边移动一边变形，而不是整块平移。每簇影子外层只做 `transform` / `opacity`（可合成），高斯模糊放在静态内层，浏览器栅格化一次即可。
- **纸片（paper）**：封面 → 最近更新 → 主题卡片 → 落款 四段式。因为 `layout: false` 不渲染 VitePress 的导航和页脚，纸片版式自带一条极简导航和页脚。

切换按钮：门厅版式在左下角（和 GitHub 并排），纸片版式在导航栏右侧。

```
docs/.vitepress/theme/
├── index.js                 # 注册全局组件
├── useHomeTheme.ts          # 首页风格切换（gate / paper），localStorage 持久化
├── styles/
│   ├── tokens.css           # 设计令牌 + 映射到 VitePress 变量
│   ├── base.css             # 导航 / 侧栏 / 正文 / 代码 / 页脚
│   ├── gate.css             # 门厅版式样式
│   └── home.css             # 纸片版式样式（含简易导航 / 页脚）
├── dapple.ts                # 程序化生成树影（分层景深 + 确定性随机）
├── components/
│   ├── HomePage.vue         # 首页包装器：根据主题渲染 GateHome 或 PaperHome
│   ├── GateHome.vue         # 门厅版式
│   ├── PaperHome.vue        # 纸片版式（含简易导航）
│   ├── GateDapple.vue       # 缓慢晃动的树叶影子
│   ├── PaperCard.vue        # 纸片卡片
│   └── SectionLabel.vue     # 大写等宽小标签
└── notes.data.mts           # 构建期读取文章列表（中文）
    enNotes.data.mts         # 同上（英文）
```

改配色只需动 `styles/tokens.css` 里的 `--fs-*` 变量（浅色在 `:root`，暗色在 `html.dark`）。字体全部使用系统栈，不下载 webfont。
