# 壁纸精选 Web 端

一个基于 React + Vite + Material-UI 构建的精美壁纸浏览和下载应用。

## 功能特性

- 🔍 **智能搜索** - 支持关键词搜索,500ms 防抖优化
- 🖼️ **精美展示** - 响应式网格布局,支持多种屏幕尺寸
- ♾️ **无限滚动** - 自动加载更多内容,流畅浏览体验
- 💾 **一键下载** - 快速下载高清壁纸到本地
- 🎨 **分类浏览** - 18 个精选分类,包含 4K 专区
- 📱 **响应式设计** - 完美适配手机、平板和桌面设备
- ⚡ **性能优化** - 路由懒加载、图片懒加载、API 缓存

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 8
- **UI 框架**: Material-UI (MUI) 5
- **路由**: React Router 6
- **HTTP 客户端**: Axios
- **状态管理**: React Context API

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 文件为 `.env`:

```bash
cp .env.example .env
```

默认配置:
```
VITE_API_BASE_URL=https://wp.shanhutech.cn/intf
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:5173 启动

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
wallpaper-web/
├── src/
│   ├── components/          # 组件
│   │   ├── common/         # 通用组件
│   │   ├── gallery/        # 图片展示组件
│   │   ├── layout/         # 布局组件
│   │   └── search/         # 搜索组件
│   ├── pages/              # 页面组件
│   ├── services/           # API 服务
│   ├── hooks/              # 自定义 Hooks
│   ├── context/            # Context 状态管理
│   ├── utils/              # 工具函数
│   ├── theme/              # MUI 主题配置
│   ├── constants/          # 常量定义
│   ├── App.jsx             # 根组件
│   └── main.jsx            # 入口文件
├── public/                 # 静态资源
├── .env.example            # 环境变量模板
├── vite.config.js          # Vite 配置
└── package.json            # 项目配置
```

## 核心功能说明

### 搜索功能

- 实时搜索,500ms 防抖优化
- 搜索历史记录(最多 10 条)
- 支持清空搜索

### 图片浏览

- 响应式网格布局
  - 手机: 2 列
  - 平板: 3 列
  - 桌面: 4-5 列
- 图片懒加载
- 悬停显示操作按钮
- 点击预览大图

### 图片详情

- 全屏模态框展示
- 键盘快捷键:
  - `ESC`: 关闭
  - `←`: 上一张
  - `→`: 下一张
- 一键下载

### 数据源

当前支持:
- ✅ Bird API (已实现)
- ⏳ Bing (待实现)
- ⏳ 360 (待实现)

## API 说明

### Bird API

**基础 URL**: `https://wp.shanhutech.cn/intf`

**接口列表**:

1. 按分类获取壁纸
   - 端点: `/GetListByCategory`
   - 参数: `cids`, `pageno`, `count`

2. 搜索壁纸
   - 端点: `/search`
   - 参数: `content`, `pageno`, `count`

## 性能优化

- ✅ 路由懒加载 (React.lazy)
- ✅ 图片懒加载 (loading="lazy")
- ✅ API 响应缓存 (5 分钟)
- ✅ 代码分割 (Vite chunks)
- ✅ 防抖优化 (搜索输入)
- ✅ 无限滚动 (Intersection Observer)

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 开发指南

### 添加新组件

1. 在 `src/components/` 对应目录创建组件文件
2. 使用 Material-UI 组件构建 UI
3. 遵循响应式设计原则
4. 添加 PropTypes 验证(可选)

### 添加新页面

1. 在 `src/pages/` 创建页面组件
2. 在 `src/App.jsx` 添加路由配置
3. 使用 ErrorBoundary 包裹页面

### 添加新 API

1. 在 `src/services/` 创建 API 文件
2. 使用 `apiClient` 发起请求
3. 实现缓存机制(如需要)
4. 创建对应的自定义 Hook

## 部署

### Vercel 部署

1. 安装 Vercel CLI:
```bash
npm i -g vercel
```

2. 登录:
```bash
vercel login
```

3. 部署:
```bash
vercel --prod
```

### 其他平台

构建后将 `dist` 目录部署到任何静态托管服务:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 许可证

MIT License

## 致谢

- 数据来源: [Bird API](https://wp.shanhutech.cn)
- UI 框架: [Material-UI](https://mui.com)
- 构建工具: [Vite](https://vitejs.dev)
