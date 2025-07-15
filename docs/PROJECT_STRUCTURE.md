# IdeaBox 项目结构

## 概述

本项目采用 Next.js 14 App Router 架构，严格遵循 Next.js 官方项目结构指南，并参考了优秀的开源项目 [task-app](https://github.com/pixegami/task-app) 的最佳实践。

## 目录结构

```
Inspira/
├── .cursor/                    # Cursor IDE 配置
│   └── rules/                  # 开发规则和指南
├── .next/                      # Next.js 构建输出 (自动生成)
├── .taskmaster/                # TaskMaster 任务管理
├── docs/                       # 项目文档
│   └── PROJECT_STRUCTURE.md    # 项目结构说明
├── node_modules/               # 依赖包 (自动生成)
├── public/                     # 静态资源
│   ├── manifest.json           # PWA 配置
│   └── robots.txt              # SEO 配置
├── src/                        # 源代码目录
│   ├── app/                    # App Router 页面和布局
│   │   ├── auth/               # 认证相关页面
│   │   ├── layout.tsx          # 根布局
│   │   └── page.tsx            # 首页
│   ├── components/             # 可重用组件
│   │   ├── ui/                 # 基础 UI 组件
│   │   └── layout/             # 布局组件
│   ├── constants/              # 常量定义
│   │   └── index.ts            # 应用常量
│   ├── contexts/               # React Context
│   │   └── AuthContext.tsx     # 认证上下文
│   ├── hooks/                  # 自定义 React Hooks
│   ├── lib/                    # 工具库和配置
│   │   ├── supabase.ts         # Supabase 客户端配置
│   │   └── utils.ts            # 通用工具函数
│   ├── styles/                 # 全局样式
│   │   └── globals.css         # 全局 CSS
│   ├── types/                  # TypeScript 类型定义
│   └── utils/                  # 工具函数
├── supabase/                   # Supabase 配置和迁移
│   ├── migrations/             # 数据库迁移文件
│   ├── functions/              # Edge Functions
│   └── config.toml             # Supabase 本地配置
├── .env.example                # 环境变量示例
├── .env.local                  # 本地环境变量 (不提交)
├── .gitignore                  # Git 忽略文件
├── next.config.js              # Next.js 配置
├── package.json                # 项目依赖和脚本
├── README.md                   # 项目说明
├── tailwind.config.js          # Tailwind CSS 配置
└── tsconfig.json               # TypeScript 配置
```

## 目录说明

### `/src` 目录

所有源代码都放在 `src` 目录下，这是 Next.js 推荐的项目结构。

#### `/src/app` - App Router

Next.js 14 的 App Router 目录结构：

- **layout.tsx**: 根布局组件，包含全局配置
- **page.tsx**: 页面组件
- **loading.tsx**: 加载状态组件
- **error.tsx**: 错误处理组件
- **not-found.tsx**: 404 页面

#### `/src/components` - 组件库

- **ui/**: 基础 UI 组件 (按钮、输入框等)
- **layout/**: 布局组件 (头部、尾部等)
- **forms/**: 表单组件
- **modals/**: 模态框组件

#### `/src/constants` - 常量

所有应用级常量定义：

- 路由常量
- API 端点
- 验证规则
- 主题配置
- 数据库表名

#### `/src/hooks` - 自定义 Hooks

自定义 React Hooks，实现业务逻辑复用：

- **useAuth**: 认证状态管理
- **useLocalStorage**: 本地存储
- **useApi**: API 调用

#### `/src/lib` - 库文件

第三方库配置和工具类：

- **supabase.ts**: Supabase 客户端配置
- **utils.ts**: 通用工具函数
- **validations.ts**: 表单验证

#### `/src/styles` - 样式文件

全局样式和主题配置：

- **globals.css**: 全局 CSS 样式

#### `/src/types` - 类型定义

TypeScript 类型定义：

- 数据库类型
- API 响应类型
- 组件 Props 类型

### `/supabase` 目录

Supabase 相关配置：

- **migrations/**: 数据库迁移文件
- **functions/**: Edge Functions
- **config.toml**: 本地开发配置

### `/public` 目录

静态资源文件：

- 图片、图标
- manifest.json (PWA)
- robots.txt (SEO)

### `/docs` 目录

项目文档：

- 项目结构说明
- API 文档
- 部署指南

## 开发规范

### 文件命名

- **组件**: PascalCase (例: `UserProfile.tsx`)
- **页面**: kebab-case (例: `user-profile/page.tsx`)
- **工具函数**: camelCase (例: `formatDate.ts`)
- **常量**: UPPER_SNAKE_CASE (例: `API_ENDPOINTS`)

### 导入规范

使用绝对路径导入：

```typescript
// ✅ 推荐
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'

// ❌ 避免
import { Button } from '../../components/ui/button'
```

### 文件结构

每个功能模块保持独立：

```
feature/
├── components/         # 功能特定组件
├── hooks/             # 功能特定 hooks
├── types/             # 功能特定类型
└── utils/             # 功能特定工具
```

## 最佳实践

1. **组件设计**: 遵循单一职责原则
2. **状态管理**: 优先使用 React Context，复杂状态考虑 Zustand
3. **类型安全**: 所有公共 API 都要有 TypeScript 类型
4. **性能优化**: 合理使用 React.memo 和 useMemo
5. **错误处理**: 使用 Error Boundaries 和 try-catch
6. **测试**: 重要功能需要单元测试和集成测试

## 参考资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Task App 示例项目](https://github.com/pixegami/task-app)
- [React 最佳实践](https://react.dev/)
- [TypeScript 指南](https://www.typescriptlang.org/docs/) 