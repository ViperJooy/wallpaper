# 壁纸 Web 端设计规格

## 项目概述

### 目标
构建一个公开访问的壁纸网站,提供浏览、搜索、预览和下载高清壁纸的功能。

### 目标用户
互联网用户,寻找高质量壁纸资源

### 核心功能
- 浏览壁纸(按分类)
- 搜索壁纸(关键词)
- 预览大图
- 下载壁纸

### 技术约束
- 纯静态网站部署
- 响应式设计(支持移动端、平板、桌面)
- 初期只集成 Bird API,Bing 和 360 数据源预留扩展

---

## 技术架构

### 技术栈

**核心框架:**
- React 18 (函数组件 + Hooks)
- Vite (构建工具)
- React Router v6 (客户端路由)

**UI 层:**
- Material-UI v5 (组件库)
- @emotion/react + @emotion/styled (CSS-in-JS)

**数据层:**
- Axios (HTTP 客户端)
- React Context + useState (状态管理)

**部署:**
- Vercel (推荐) / Netlify / Cloudflare Pages

### 项目结构

```
wallpaper-web/
├── src/
│   ├── components/          # React 组件
│   │   ├── layout/         # 布局组件
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── search/         # 搜索相关
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchHistory.jsx
│   │   ├── gallery/        # 图片展示
│   │   │   ├── ImageGrid.jsx
│   │   │   ├── ImageCard.jsx
│   │   │   └── ImageDetail.jsx
│   │   └── common/         # 通用组件
│   │       ├── Loading.jsx
│   │       ├── ErrorBoundary.jsx
│   │       └── EmptyState.jsx
│   ├── pages/              # 页面组件
│   │   ├── Home.jsx        # 首页
│   │   ├── Category.jsx    # 分类浏览
│   │   └── ImageDetail.jsx # 图片详情
│   ├── services/           # API 服务
│   │   ├── api.js          # API 基础配置
│   │   └── birdApi.js      # Bird API 封装
│   ├── hooks/              # 自定义 Hooks
│   │   ├── useWallpapers.js
│   │   └── useSearch.js
│   ├── utils/              # 工具函数
│   │   ├── download.js     # 下载功能
│   │   └── storage.js      # localStorage 封装
│   ├── context/            # React Context
│   │   └── AppContext.jsx  # 全局状态
│   ├── theme/              # MUI 主题
│   │   └── theme.js
│   ├── constants/          # 常量定义
│   │   └── categories.js   # 分类列表
│   ├── App.jsx             # 根组件
│   └── main.jsx            # 入口文件
├── public/                 # 静态资源
│   └── favicon.ico
├── index.html
├── vite.config.js
├── package.json
└── .env.example
```

### 路由设计

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | Home | 首页(搜索优先界面) |
| `/category/:id` | Category | 分类浏览页 |
| `/image/:id` | ImageDetail | 图片详情/大图预览 |

---

## UI/UX 设计

### 布局风格

**搜索优先布局** - 用户选择的方案

**首页结构:**
```
┌─────────────────────────────────────┐
│  Hero Section                        │
│  - 大标题: "发现精美壁纸"            │
│  - 副标题: "搜索数万张高清壁纸"      │
│  - 大型搜索框                        │
│  - 数据源切换标签 (Bird/Bing/360)   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  内容区域                            │
│  - 热门推荐 / 搜索结果               │
│  - 响应式网格布局                    │
│  - 无限滚动加载                      │
└─────────────────────────────────────┘
```

### Material-UI 主题配置

**颜色方案:**
- Primary: `#1976d2` (蓝色)
- Secondary: `#dc004e` (粉色)
- Background: `#fafafa` (浅灰)
- Surface: `#ffffff` (白色)

**字体:**
- 英文: Roboto
- 中文: 系统默认(PingFang SC / Microsoft YaHei)

**圆角:**
- 卡片: 4px
- 按钮: 4px
- 输入框: 4px

**阴影:**
- 卡片: `0 2px 4px rgba(0,0,0,0.1)`
- 悬停: `0 4px 8px rgba(0,0,0,0.15)`

### 响应式断点

| 断点 | 宽度范围 | 网格列数 | 用途 |
|------|----------|----------|------|
| xs | 0-600px | 2 | 手机竖屏 |
| sm | 600-900px | 2 | 手机横屏/小平板 |
| md | 900-1200px | 3 | 平板 |
| lg | 1200-1536px | 4 | 桌面 |
| xl | 1536px+ | 4-5 | 大屏 |

### 交互细节

**图片卡片:**
- 默认状态: 显示缩略图
- 悬停状态: 
  - 图片轻微放大 (scale: 1.05)
  - 显示半透明遮罩层
  - 显示标签、下载按钮、预览按钮
- 过渡动画: 300ms ease-in-out

**搜索框:**
- 聚焦时: 边框高亮 + 阴影增强
- 输入时: 显示清空按钮
- 防抖: 500ms
- 显示搜索结果数量

**加载状态:**
- 首次加载: Skeleton 骨架屏
- 滚动加载: 底部 CircularProgress
- 图片加载: fade-in 渐显效果

**错误处理:**
- API 失败: 显示错误提示 + 重试按钮
- 图片加载失败: 显示占位图
- 无搜索结果: 显示空状态插图 + 搜索建议

---

## 核心组件设计

### 1. Home 组件 (首页)

**职责:**
- 渲染搜索优先界面
- 管理搜索状态
- 显示热门推荐或搜索结果

**状态:**
- `searchKeyword`: 搜索关键词
- `dataSource`: 当前数据源 (bird/bing/360)
- `wallpapers`: 壁纸列表
- `loading`: 加载状态
- `error`: 错误信息

**子组件:**
- `HeroSection`: Hero 区域(标题 + 搜索框)
- `DataSourceTabs`: 数据源切换标签
- `ImageGrid`: 图片网格

### 2. ImageGrid 组件 (图片网格)

**职责:**
- 响应式网格布局
- 渲染图片卡片列表
- 无限滚动加载

**Props:**
- `images`: 图片数据数组
- `loading`: 加载状态
- `onLoadMore`: 加载更多回调

**功能:**
- 使用 Intersection Observer 实现无限滚动
- 懒加载图片
- 响应式列数调整

### 3. ImageCard 组件 (图片卡片)

**职责:**
- 显示单张壁纸缩略图
- 悬停交互效果
- 点击进入详情

**Props:**
- `image`: 图片数据对象
  - `url`: 图片 URL
  - `tag`: 标签字符串
  - `id`: 图片 ID

**交互:**
- 点击卡片: 导航到详情页
- 点击下载按钮: 直接下载
- 悬停: 显示操作按钮

### 4. ImageDetail 组件 (图片详情)

**职责:**
- 全屏大图预览
- 显示图片信息
- 提供下载功能

**功能:**
- 全屏模态框
- 显示高清大图
- 显示标签信息
- 多分辨率下载选项
- ESC 键关闭
- 左右箭头切换上一张/下一张

**Props:**
- `imageId`: 当前图片 ID
- `images`: 图片列表(用于切换)
- `onClose`: 关闭回调

### 5. SearchBar 组件 (搜索框)

**职责:**
- 接收用户输入
- 防抖处理
- 显示搜索历史

**功能:**
- 输入防抖 (500ms)
- 搜索历史记录 (localStorage)
- 清空按钮
- 回车触发搜索

**Props:**
- `value`: 搜索关键词
- `onChange`: 输入变化回调
- `onSearch`: 搜索触发回调

---

## 数据层设计

### Bird API 集成

**API 基础地址:**
```
https://wp.shanhutech.cn/intf/
```

**接口封装 (birdApi.js):**

```javascript
// 按分类获取壁纸
async function getByCategory(categoryId, page = 1, count = 12) {
  // GET /GetListByCategory?cids={categoryId}&pageno={page}&count={count}
  // 返回: { data: { total_count, list: [{ url, tag }] } }
}

// 搜索壁纸
async function search(keyword, page = 1, count = 12) {
  // GET /search?content={encodeURIComponent(keyword)}&pageno={page}&count={count}
  // 返回: { data: { total_count, list: [{ url, tag }] } }
}

// 分类列表
const categories = [
  { id: 36, name: '4K专区', icon: '🖼️' },
  { id: 9, name: '风景大片', icon: '🏞️' },
  { id: 6, name: '美女模特', icon: '👩' },
  { id: 30, name: '爱情美图', icon: '💕' },
  { id: 15, name: '小清新', icon: '🌸' },
  { id: 26, name: '动漫卡通', icon: '🎨' },
  { id: 14, name: '萌宠动物', icon: '🐱' },
  { id: 5, name: '游戏壁纸', icon: '🎮' },
  { id: 12, name: '汽车天下', icon: '🚗' },
  { id: 10, name: '炫酷时尚', icon: '✨' },
  { id: 29, name: '月历壁纸', icon: '📅' },
  { id: 16, name: '劲爆体育', icon: '⚽' },
  { id: 7, name: '影视剧照', icon: '🎬' },
  { id: 13, name: '节日美图', icon: '🎉' },
  { id: 22, name: '军事天地', icon: '✈️' },
  { id: 18, name: 'BABY秀', icon: '👶' },
  { id: 35, name: '文字控', icon: '📝' },
  { id: 11, name: '明星风尚', icon: '⭐' }
];
```

**错误处理:**
- 网络错误: 显示"网络连接失败,请检查网络"
- 超时: 10 秒超时,显示"请求超时,请重试"
- API 错误: 显示具体错误信息
- 重试机制: 失败后提供重试按钮

**数据缓存:**
- 使用简单的内存缓存
- 缓存时间: 5 分钟
- 缓存键: `${endpoint}-${params}`

### 状态管理

**全局状态 (AppContext):**
```javascript
{
  dataSource: 'bird',        // 当前数据源
  searchKeyword: '',         // 搜索关键词
  currentCategory: null,     // 当前分类
  searchHistory: [],         // 搜索历史
  favorites: []              // 收藏列表(预留)
}
```

**本地存储 (localStorage):**
- `searchHistory`: 搜索历史(最多 10 条)
- `dataSource`: 上次选择的数据源
- `favorites`: 收藏的壁纸 ID 列表(预留)

---

## 性能优化

### 图片优化

**懒加载:**
- 使用 Intersection Observer API
- 图片进入视口前 200px 开始加载
- 显示占位符或骨架屏

**渐进式加载:**
- 先加载缩略图(低质量)
- 再加载高清图(按需)
- 使用 fade-in 过渡效果

**缓存策略:**
- 浏览器缓存: Cache-Control
- Service Worker 缓存(可选)

### 代码优化

**代码分割:**
- 路由懒加载: `React.lazy()` + `Suspense`
- 组件按需加载
- 第三方库按需引入

**组件优化:**
- 使用 `React.memo()` 避免不必要渲染
- 使用 `useMemo()` 缓存计算结果
- 使用 `useCallback()` 缓存回调函数

**防抖和节流:**
- 搜索输入: 防抖 500ms
- 滚动事件: 节流 200ms
- 窗口 resize: 节流 300ms

### 网络优化

**请求优化:**
- 合并请求
- 取消重复请求
- 请求超时控制

**资源优化:**
- Gzip 压缩
- 代码压缩和混淆
- Tree shaking 移除未使用代码

---

## 功能详细说明

### 1. 浏览功能

**热门推荐:**
- 默认显示 4K 专区的前 20 张
- 响应式网格布局
- 无限滚动加载更多

**分类浏览:**
- 顶部显示分类标签
- 点击切换分类
- 每个分类独立分页

### 2. 搜索功能

**搜索流程:**
1. 用户输入关键词
2. 防抖 500ms
3. 调用 Bird API search 接口
4. 显示搜索结果
5. 保存到搜索历史

**搜索历史:**
- 最多保存 10 条
- 点击历史记录快速搜索
- 可清空历史

**搜索建议:**
- 无结果时显示热门搜索词
- 建议相关分类

### 3. 预览功能

**大图预览:**
- 点击图片卡片打开全屏预览
- 显示高清大图
- 显示图片标签
- 左右箭头切换图片
- ESC 键或点击关闭按钮关闭

**预览信息:**
- 图片标签
- 图片来源(Bird)
- 下载按钮

### 4. 下载功能

**下载方式:**
- 点击下载按钮
- 使用 `<a>` 标签 + `download` 属性
- 或使用 Blob + URL.createObjectURL

**下载选项:**
- 原图(直接下载 URL)
- 不同分辨率(如果 API 支持)

**下载文件名:**
- 格式: `wallpaper-{timestamp}.jpg`
- 或使用标签作为文件名

---

## 扩展性设计

### 数据源抽象

**为未来集成 Bing 和 360 预留接口:**

```javascript
// 数据源接口
interface DataSource {
  name: string;
  getByCategory(categoryId, page, count): Promise<Response>;
  search(keyword, page, count): Promise<Response>;
  getCategories(): Category[];
}

// 统一响应格式
interface Response {
  total: number;
  list: Image[];
}

interface Image {
  id: string;
  url: string;
  tags: string[];
  source: string;
}
```

**实现:**
- `BirdDataSource` - 已实现
- `BingDataSource` - 预留
- `Source360DataSource` - 预留

**数据源管理器:**
```javascript
class DataSourceManager {
  sources = {
    bird: new BirdDataSource(),
    bing: new BingDataSource(),  // 预留
    360: new Source360DataSource() // 预留
  };
  
  getCurrentSource() {
    return this.sources[currentDataSource];
  }
}
```

### 扩展路径

**阶段 1: 当前实现 (纯前端 + Bird API)**
- ✅ 完全静态部署
- ✅ 只使用 Bird 在线 API

**阶段 2: 添加 Bing/360 (纯前端方案)**
- 将 Bing/360 JSON 数据转为 JS 模块
- 打包到项目中
- 前端直接 import 使用

**阶段 3: 混合方案 (Serverless Functions)**
- 使用 Vercel/Netlify Functions
- 后端读取本地 JSON 文件
- 前端调用 Functions API

**阶段 4: 完整后端 (迁移到 Next.js)**
- 使用 Next.js API Routes
- 后端处理所有数据源
- 支持服务端渲染(SSR)

---

## 部署方案

### 推荐平台: Vercel

**优点:**
- 零配置部署
- 自动 HTTPS
- 全球 CDN
- 自动构建和预览
- 免费额度充足

**部署步骤:**
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. Vercel 自动检测 Vite 配置
4. 自动构建和部署
5. 获得生产环境 URL

**环境变量:**
```
VITE_API_BASE_URL=https://wp.shanhutech.cn/intf
VITE_APP_TITLE=精美壁纸
```

### 备选平台

**Netlify:**
- 功能类似 Vercel
- 配置文件: `netlify.toml`

**Cloudflare Pages:**
- 速度快
- 免费额度大

**GitHub Pages:**
- 完全免费
- 需要配置 base path
- 构建脚本: `npm run build && gh-pages -d dist`

---

## 开发流程

### 初始化项目

```bash
# 创建 Vite + React 项目
npm create vite@latest wallpaper-web -- --template react

# 进入项目目录
cd wallpaper-web

# 安装依赖
npm install

# 安装 Material-UI
npm install @mui/material @emotion/react @emotion/styled

# 安装其他依赖
npm install react-router-dom axios

# 启动开发服务器
npm run dev
```

### 开发规范

**代码风格:**
- ESLint + Prettier
- 组件文件名: PascalCase (如 `ImageCard.jsx`)
- 工具函数: camelCase (如 `downloadImage.js`)
- 常量: UPPER_SNAKE_CASE (如 `API_BASE_URL`)

**提交规范:**
- 使用约定式提交 (Conventional Commits)
- 格式: `<type>(<scope>): <subject>`
- 类型: feat, fix, docs, style, refactor, test, chore

**分支策略:**
- `main`: 生产环境
- `develop`: 开发环境
- `feature/*`: 功能分支

### 测试策略

**单元测试 (可选):**
- 使用 Vitest
- 测试工具函数
- 测试自定义 Hooks

**E2E 测试 (可选):**
- 使用 Playwright
- 测试关键用户流程

---

## 风险与限制

### 技术风险

**API 依赖:**
- **风险**: Bird API 不稳定或关闭
- **缓解**: 
  - 实现错误处理和重试机制
  - 预留其他数据源接口
  - 考虑数据缓存策略

**跨域问题:**
- **风险**: Bird API 可能有 CORS 限制
- **缓解**: 
  - 测试 API 跨域支持
  - 如有问题,使用代理或 Serverless Functions

**性能问题:**
- **风险**: 大量图片加载影响性能
- **缓解**: 
  - 懒加载
  - 虚拟滚动(如果需要)
  - 图片压缩

### 功能限制

**当前阶段限制:**
- 只支持 Bird API
- 无用户账号系统
- 无收藏功能
- 无评论功能
- 无分享功能

**未来可扩展:**
- 添加 Bing/360 数据源
- 添加用户系统
- 添加社交功能

---

## 成功标准

### 功能完整性
- ✅ 用户可以浏览壁纸
- ✅ 用户可以搜索壁纸
- ✅ 用户可以预览大图
- ✅ 用户可以下载壁纸
- ✅ 响应式设计在各设备正常工作

### 性能指标
- 首屏加载时间 < 3 秒
- 图片懒加载正常工作
- 搜索响应时间 < 1 秒
- 无明显卡顿

### 用户体验
- 界面美观,符合 Material Design 规范
- 交互流畅,反馈及时
- 错误提示友好
- 移动端体验良好

---

## 时间估算

**开发阶段:**
- 项目初始化和配置: 0.5 天
- 基础组件开发: 1 天
- 页面开发: 1.5 天
- API 集成: 0.5 天
- 样式和交互优化: 1 天
- 测试和修复: 0.5 天

**总计: 约 5 天**

---

## 附录

### 参考资料

**API 文档:**
- Bird API: 见项目中的 `wallpaper-api-docs.md`

**技术文档:**
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Material-UI: https://mui.com/
- React Router: https://reactrouter.com/

**设计参考:**
- Unsplash: https://unsplash.com/
- Pexels: https://www.pexels.com/

### 术语表

- **Hero Section**: 首屏大型展示区域
- **懒加载**: 延迟加载,只在需要时加载资源
- **防抖**: 延迟执行,在一定时间内只执行最后一次
- **节流**: 限制执行频率,在一定时间内只执行一次
- **响应式**: 自适应不同屏幕尺寸
- **SSR**: Server-Side Rendering,服务端渲染

---

**文档版本**: 1.0  
**创建日期**: 2026-05-13  
**最后更新**: 2026-05-13  
**作者**: Claude Code  
**状态**: 待审查
