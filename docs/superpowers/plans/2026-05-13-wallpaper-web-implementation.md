# 壁纸 Web 端实现计划

> 基于设计规格: `docs/superpowers/specs/2026-05-13-wallpaper-web-design.md`

## 概述

本计划将分 7 个阶段实现壁纸 Web 端,每个阶段都有明确的交付物和验证标准。

---

## 阶段 1: 项目初始化

### 目标
搭建基础项目结构和开发环境

### 任务清单

**1.1 创建 Vite + React 项目**
```bash
npm create vite@latest wallpaper-web -- --template react
cd wallpaper-web
npm install
```

**1.2 安装核心依赖**
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install react-router-dom axios
npm install @mui/icons-material
```

**1.3 配置项目结构**
- 创建 `src/components/` 目录结构
- 创建 `src/pages/` 目录
- 创建 `src/services/` 目录
- 创建 `src/hooks/` 目录
- 创建 `src/utils/` 目录
- 创建 `src/context/` 目录
- 创建 `src/theme/` 目录
- 创建 `src/constants/` 目录

**1.4 配置环境变量**
- 创建 `.env.example` 文件
- 添加 `VITE_API_BASE_URL=https://wp.shanhutech.cn/intf`

**1.5 配置 Git**
- 初始化 Git 仓库
- 创建 `.gitignore`
- 添加 `.env` 到 `.gitignore`

### 验证标准
- ✅ `npm run dev` 成功启动开发服务器
- ✅ 浏览器访问 `http://localhost:5173` 显示默认页面
- ✅ 项目结构符合设计规格

### 预计时间
0.5 天

---

## 阶段 2: 基础设施层

### 目标
实现 MUI 主题、路由配置、全局状态管理

### 任务清单

**2.1 配置 Material-UI 主题**

文件: `src/theme/theme.js`
```javascript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#fafafa' }
  },
  shape: { borderRadius: 4 },
  // ... 其他配置
});
```

**2.2 配置路由**

文件: `src/App.jsx`
- 配置 React Router
- 定义路由: `/`, `/category/:id`, `/image/:id`
- 添加 404 页面

**2.3 创建全局状态管理**

文件: `src/context/AppContext.jsx`
- 创建 AppContext
- 定义全局状态: dataSource, searchKeyword, currentCategory, searchHistory
- 提供 Context Provider

**2.4 创建工具函数**

文件: `src/utils/storage.js`
- localStorage 封装函数
- getItem, setItem, removeItem

文件: `src/utils/download.js`
- 图片下载函数
- 使用 `<a>` 标签 + download 属性

**2.5 定义常量**

文件: `src/constants/categories.js`
- 定义 Bird API 分类列表
- 18 个分类,包含 id, name, icon

### 验证标准
- ✅ 主题正确应用到应用
- ✅ 路由切换正常工作
- ✅ Context 可以在组件中访问
- ✅ 工具函数单元测试通过(可选)

### 预计时间
0.5 天

---

## 阶段 3: API 服务层

### 目标
封装 Bird API,实现数据获取功能

### 任务清单

**3.1 创建 API 基础配置**

文件: `src/services/api.js`
```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

// 请求拦截器
// 响应拦截器
// 错误处理

export default apiClient;
```

**3.2 封装 Bird API**

文件: `src/services/birdApi.js`
```javascript
import apiClient from './api';

export const birdApi = {
  // 按分类获取壁纸
  async getByCategory(categoryId, page = 1, count = 12) {
    const response = await apiClient.get('/GetListByCategory', {
      params: { cids: categoryId, pageno: page, count }
    });
    return response.data;
  },

  // 搜索壁纸
  async search(keyword, page = 1, count = 12) {
    const response = await apiClient.get('/search', {
      params: { 
        content: encodeURIComponent(keyword), 
        pageno: page, 
        count 
      }
    });
    return response.data;
  }
};
```

**3.3 创建自定义 Hooks**

文件: `src/hooks/useWallpapers.js`
- 封装壁纸数据获取逻辑
- 处理加载状态、错误状态
- 实现分页逻辑

文件: `src/hooks/useSearch.js`
- 封装搜索逻辑
- 实现防抖(500ms)
- 管理搜索历史

**3.4 实现数据缓存**
- 简单的内存缓存
- 缓存时间 5 分钟
- 缓存键: `${endpoint}-${params}`

### 验证标准
- ✅ API 调用成功返回数据
- ✅ 错误处理正常工作
- ✅ 防抖功能正常
- ✅ 缓存机制生效

### 预计时间
0.5 天

---

## 阶段 4: 通用组件

### 目标
实现可复用的通用组件

### 任务清单

**4.1 Loading 组件**

文件: `src/components/common/Loading.jsx`
- 使用 MUI CircularProgress
- 居中显示
- 可配置大小和颜色

**4.2 ErrorBoundary 组件**

文件: `src/components/common/ErrorBoundary.jsx`
- React Error Boundary
- 捕获组件错误
- 显示友好错误信息

**4.3 EmptyState 组件**

文件: `src/components/common/EmptyState.jsx`
- 空状态展示
- 可配置图标、标题、描述
- 可选操作按钮

**4.4 Header 组件**

文件: `src/components/layout/Header.jsx`
- 顶部导航栏
- Logo 和标题
- 响应式设计

**4.5 Footer 组件**

文件: `src/components/layout/Footer.jsx`
- 底部信息
- 版权声明
- 链接

### 验证标准
- ✅ 所有组件独立渲染正常
- ✅ 响应式布局在不同屏幕正常
- ✅ 组件 props 验证正确

### 预计时间
0.5 天

---

## 阶段 5: 核心功能组件

### 目标
实现搜索、图片展示等核心功能组件

### 任务清单

**5.1 SearchBar 组件**

文件: `src/components/search/SearchBar.jsx`
- MUI TextField
- 防抖输入(500ms)
- 清空按钮
- 回车触发搜索
- 聚焦样式

**5.2 ImageCard 组件**

文件: `src/components/gallery/ImageCard.jsx`
- 图片卡片展示
- 懒加载图片
- 悬停效果(scale 1.05)
- 显示遮罩层(标签、下载、预览按钮)
- 过渡动画 300ms

**5.3 ImageGrid 组件**

文件: `src/components/gallery/ImageGrid.jsx`
- 响应式网格布局
  - xs: 2 列
  - sm: 2 列
  - md: 3 列
  - lg: 4 列
  - xl: 4-5 列
- 渲染 ImageCard 列表
- 无限滚动(Intersection Observer)
- 加载更多指示器

**5.4 ImageDetail 组件**

文件: `src/components/gallery/ImageDetail.jsx`
- MUI Dialog 全屏模态框
- 显示高清大图
- 显示标签信息
- 下载按钮
- ESC 键关闭
- 左右箭头切换图片
- 关闭按钮

**5.5 DataSourceTabs 组件**

文件: `src/components/search/DataSourceTabs.jsx`
- MUI Tabs
- 三个标签: Bird, Bing, 360
- 当前只有 Bird 可用,其他置灰
- 切换数据源

### 验证标准
- ✅ 搜索功能正常,防抖生效
- ✅ 图片卡片正确显示,悬停效果正常
- ✅ 网格布局响应式正常
- ✅ 无限滚动加载正常
- ✅ 图片详情模态框正常工作
- ✅ 键盘快捷键正常

### 预计时间
1.5 天

---

## 阶段 6: 页面组件

### 目标
组装页面,实现完整用户流程

### 任务清单

**6.1 Home 页面**

文件: `src/pages/Home.jsx`

结构:
```jsx
<Box>
  {/* Hero Section */}
  <Box sx={{ background: 'linear-gradient(...)' }}>
    <Typography variant="h2">发现精美壁纸</Typography>
    <Typography variant="subtitle1">搜索数万张高清壁纸</Typography>
    <SearchBar />
    <DataSourceTabs />
  </Box>

  {/* Content Section */}
  <Container>
    <Typography variant="h5">
      {searchKeyword ? '搜索结果' : '热门推荐'}
    </Typography>
    <ImageGrid images={wallpapers} onLoadMore={loadMore} />
  </Container>
</Box>
```

功能:
- 默认显示 4K 专区(categoryId=36)前 20 张
- 搜索时显示搜索结果
- 无限滚动加载更多
- 点击图片进入详情页

**6.2 Category 页面**

文件: `src/pages/Category.jsx`
- 从 URL 参数获取 categoryId
- 显示分类名称
- 显示该分类的壁纸
- 分页加载

**6.3 ImageDetail 页面**

文件: `src/pages/ImageDetail.jsx`
- 从 URL 参数获取 imageId
- 使用 ImageDetail 组件
- 支持左右切换
- 关闭返回上一页

### 验证标准
- ✅ 首页正确显示热门推荐
- ✅ 搜索功能完整工作
- ✅ 分类浏览正常
- ✅ 图片详情页正常
- ✅ 路由导航正常

### 预计时间
1 天

---

## 阶段 7: 优化和部署

### 目标
性能优化、测试、部署

### 任务清单

**7.1 性能优化**
- 实现图片懒加载
- 路由懒加载(React.lazy)
- 组件 memo 化
- 代码分割
- 添加 Skeleton 骨架屏

**7.2 错误处理优化**
- 完善 API 错误处理
- 添加重试机制
- 图片加载失败占位图
- 无搜索结果提示

**7.3 响应式测试**
- 测试手机端(xs, sm)
- 测试平板端(md)
- 测试桌面端(lg, xl)
- 修复布局问题

**7.4 浏览器测试**
- Chrome
- Firefox
- Safari
- Edge

**7.5 构建优化**
- 配置 vite.config.js
- 代码压缩
- 资源优化
- 生成 source map

**7.6 部署到 Vercel**
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

配置:
- 设置环境变量
- 配置自定义域名(可选)
- 配置 HTTPS

**7.7 文档完善**
- 更新 README.md
- 添加使用说明
- 添加开发指南
- 添加部署说明

### 验证标准
- ✅ 首屏加载时间 < 3 秒
- ✅ 图片懒加载正常
- ✅ 所有设备响应式正常
- ✅ 所有浏览器兼容
- ✅ 生产环境部署成功
- ✅ 无控制台错误

### 预计时间
1 天

---

## 总体时间估算

| 阶段 | 任务 | 预计时间 |
|------|------|----------|
| 1 | 项目初始化 | 0.5 天 |
| 2 | 基础设施层 | 0.5 天 |
| 3 | API 服务层 | 0.5 天 |
| 4 | 通用组件 | 0.5 天 |
| 5 | 核心功能组件 | 1.5 天 |
| 6 | 页面组件 | 1 天 |
| 7 | 优化和部署 | 1 天 |
| **总计** | | **5.5 天** |

---

## 关键文件清单

### 配置文件
- `vite.config.js` - Vite 配置
- `package.json` - 依赖管理
- `.env.example` - 环境变量模板

### 核心文件
- `src/main.jsx` - 应用入口
- `src/App.jsx` - 根组件,路由配置
- `src/theme/theme.js` - MUI 主题
- `src/context/AppContext.jsx` - 全局状态

### API 层
- `src/services/api.js` - Axios 配置
- `src/services/birdApi.js` - Bird API 封装

### Hooks
- `src/hooks/useWallpapers.js` - 壁纸数据
- `src/hooks/useSearch.js` - 搜索逻辑

### 组件
- `src/components/layout/Header.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/search/SearchBar.jsx`
- `src/components/search/DataSourceTabs.jsx`
- `src/components/gallery/ImageGrid.jsx`
- `src/components/gallery/ImageCard.jsx`
- `src/components/gallery/ImageDetail.jsx`
- `src/components/common/Loading.jsx`
- `src/components/common/ErrorBoundary.jsx`
- `src/components/common/EmptyState.jsx`

### 页面
- `src/pages/Home.jsx`
- `src/pages/Category.jsx`
- `src/pages/ImageDetail.jsx`

### 工具
- `src/utils/storage.js`
- `src/utils/download.js`

### 常量
- `src/constants/categories.js`

---

## 风险和注意事项

### 技术风险
1. **Bird API 稳定性** - 如果 API 不稳定,需要实现重试和降级策略
2. **CORS 问题** - 如果遇到跨域问题,可能需要配置代理
3. **图片加载性能** - 大量图片可能影响性能,需要优化懒加载

### 开发注意事项
1. **响应式设计** - 每个组件都要考虑移动端适配
2. **错误处理** - 所有 API 调用都要有错误处理
3. **用户体验** - 加载状态、空状态、错误状态都要有友好提示
4. **性能优化** - 避免不必要的重渲染,使用 memo 和 callback

---

## 执行建议

### 开发顺序
1. 按阶段顺序执行,不要跳跃
2. 每个阶段完成后进行验证
3. 遇到问题及时调整计划

### 测试策略
1. 开发过程中持续测试
2. 每个组件完成后独立测试
3. 集成后进行端到端测试

### 代码质量
1. 保持代码简洁清晰
2. 添加必要的注释
3. 遵循 React 最佳实践
4. 使用 ESLint 检查代码

---

## 后续扩展

### 阶段 8: 添加 Bing 数据源(未来)
- 处理本地 JSON 文件
- 实现 BingDataSource
- 更新数据源切换逻辑

### 阶段 9: 添加 360 数据源(未来)
- 处理 ZIP 压缩包
- 实现 Source360DataSource
- 完善数据源管理

### 阶段 10: 高级功能(未来)
- 用户账号系统
- 收藏功能
- 分享功能
- 评论功能

---

**计划版本**: 1.0  
**创建日期**: 2026-05-13  
**基于规格**: docs/superpowers/specs/2026-05-13-wallpaper-web-design.md  
**状态**: 待执行
