# IdeaBox - 灵感火花工具箱

为内容创作者、品牌从业者、营销人和自由撰稿人提供一站式创意生成工具

## 🚀 功能特性

- **爆款标题生成器** - AI驱动的标题创作
- **品牌命名器** - 专业的品牌命名建议
- **广告语生成器** - 创造吸引人的广告语
- **随机创意提示器** - 灵感骰子功能
- **灵感收藏夹** - 管理你的创意收藏
- **灵感广场** - 社区分享平台
- **AI 灵感助手** - 智能对话助手
- **图像提示词生成器** - AI 图像生成工具
- **创意改写器** - 多风格内容改写
- **标题优化器** - A/B 测试工具

## 🛠️ 技术栈

- **前端**: Next.js 14, React 18, TypeScript
- **样式**: Tailwind CSS, shadcn/ui
- **后端**: Supabase (数据库 + 认证)
- **AI**: OpenAI API
- **部署**: Vercel (推荐)

## 📦 安装说明

### 1. 克隆项目

\`\`\`bash
git clone <your-repo-url>
cd ideabox
\`\`\`

### 2. 安装依赖

\`\`\`bash
npm install

# 或

yarn install

# 或

pnpm install
\`\`\`

### 3. 环境变量配置

创建 \`.env.local\` 文件并配置以下环境变量：

\`\`\`bash

# 应用配置

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=IdeaBox

# OpenAI API

OPENAI_API_KEY=your_openai_api_key_here

# Supabase 配置

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 数据库

DATABASE_URL=your_database_connection_string

# JWT Secret

JWT_SECRET=your_jwt_secret_key
\`\`\`

### 4. 启动开发服务器

\`\`\`bash
npm run dev

# 或

yarn dev

# 或

pnpm dev
\`\`\`

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🔧 开发命令

- \`npm run dev\` - 启动开发服务器
- \`npm run build\` - 构建生产版本
- \`npm run start\` - 启动生产服务器
- \`npm run lint\` - 运行 ESLint
- \`npm run type-check\` - TypeScript 类型检查
- \`npm run format\` - 格式化代码
- \`npm run format:check\` - 检查代码格式

## 📁 项目结构

\`\`\`
Inspira/
├── .cursor/                     # Cursor IDE 配置
│   └── rules/                   # 开发规则和指南
│       └── nextjs_structure.mdc # Next.js 项目结构规则
├── docs/                        # 项目文档
│   └── PROJECT_STRUCTURE.md     # 项目结构说明
├── public/                      # 静态资源
│   ├── manifest.json            # PWA 配置
│   └── robots.txt               # SEO 配置
├── src/                         # 源代码目录
│   ├── app/                     # App Router 页面和布局
│   │   ├── api/                 # API 路由
│   │   │   └── health/          # 健康检查端点
│   │   ├── auth/                # 认证相关页面
│   │   │   ├── login/           # 登录页
│   │   │   └── register/        # 注册页
│   │   ├── error.tsx            # 全局错误页面
│   │   ├── loading.tsx          # 全局加载页面
│   │   ├── not-found.tsx        # 404 页面
│   │   ├── layout.tsx           # 根布局
│   │   └── page.tsx             # 首页
│   ├── components/              # 可重用组件
│   │   ├── ui/                  # 基础 UI 组件
│   │   └── error-boundary.tsx   # 错误边界组件
│   ├── constants/               # 常量定义
│   │   └── index.ts             # 应用常量
│   ├── contexts/                # React Context
│   │   └── AuthContext.tsx      # 认证上下文
│   ├── hooks/                   # 自定义 Hooks
│   │   ├── useLocalStorage.ts   # 本地存储 Hook
│   │   └── index.ts             # Hooks 统一导出
│   ├── lib/                     # 库文件和配置
│   │   ├── env.ts               # 环境变量验证
│   │   ├── supabase.ts          # Supabase 客户端配置
│   │   └── supabase-server.ts   # Supabase 服务端配置
│   ├── styles/                  # 样式文件
│   │   └── globals.css          # 全局样式
│   ├── types/                   # TypeScript 类型定义
│   │   └── database.types.ts    # 数据库类型
│   ├── utils/                   # 工具函数
│   │   ├── cn.ts                # 类名合并工具
│   │   ├── format.ts            # 格式化工具
│   │   └── index.ts             # 工具函数统一导出
│   └── middleware.ts            # Next.js 中间件
├── supabase/                    # Supabase 配置
│   ├── migrations/              # 数据库迁移文件
│   │   └── 20240101000000_initial_schema.sql
│   └── config.toml              # Supabase 配置文件
├── .env.example                 # 环境变量示例
├── .env.local                   # 本地环境变量（需要创建）
├── next.config.js               # Next.js 配置
├── tailwind.config.js           # Tailwind CSS 配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 项目依赖和脚本
\`\`\`

> 📋 这个项目结构严格遵循 [Next.js 官方项目结构指南](https://nextjs.org/docs/app/getting-started/project-structure) 和 [task-app](https://github.com/pixegami/task-app) 最佳实践。

## 🎯 开发路线图

- [x] 项目基础架构搭建
- [ ] UI 组件库和设计系统
- [ ] Supabase 后端服务配置
- [ ] OpenAI API 集成
- [ ] 用户认证和权限管理
- [ ] 核心功能开发
- [ ] 社区功能
- [ ] 性能优化
- [ ] 部署和 CI/CD

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系我们

如有问题或建议，请联系：your-email@example.com
 