# Inspira - 灵感火花工具箱

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

```bash
git clone <your-repo-url>
cd Inspira
```

### 2. 安装依赖

```bash
npm install

# 或

yarn install

# 或

pnpm install
```

### 3. 环境变量配置

创建 `.env.local` 文件并配置以下环境变量：

```bash
# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Inspira

# Supabase 配置 (必需)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI API (可选，用于 AI 功能)
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Supabase 配置

项目已包含完整的 Supabase 配置，包括：

- ✅ 数据库表结构 (用户配置、收藏夹、社区等)
- ✅ 行级安全策略 (RLS)
- ✅ 认证系统配置
- ✅ 类型定义和工具函数

**快速设置步骤：**

1. 访问 [Supabase](https://supabase.com) 创建新项目
2. 获取项目 URL 和 anon key
3. 在 Supabase Dashboard 的 SQL Editor 中执行迁移文件：
   - `supabase/migrations/20240101000000_initial_schema.sql`
   - `supabase/migrations/20240101000001_complete_schema.sql`
4. 配置认证重定向 URL

详细配置指南请参考：[Supabase 配置文档](./docs/SUPABASE_SETUP.md)

### 5. 启动开发服务器

```bash
npm run dev

# 或

yarn dev

# 或

pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🔧 开发命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint
- `npm run type-check` - TypeScript 类型检查
- `npm run format` - 格式化代码
- `npm run format:check` - 检查代码格式

## 📁 项目结构

```
Inspira/
├── .cursor/                     # Cursor IDE 配置
│   └── rules/                   # 开发规则和指南
├── .taskmaster/                 # Taskmaster 项目管理
│   ├── tasks/                   # 任务文件
│   └── docs/                    # 项目文档
├── docs/                        # 项目文档
│   ├── PROJECT_STRUCTURE.md     # 项目结构说明
│   └── SUPABASE_SETUP.md        # Supabase 配置指南
├── public/                      # 静态资源
│   ├── manifest.json            # PWA 配置
│   └── robots.txt               # SEO 配置
├── src/                         # 源代码目录
│   ├── app/                     # App Router 页面和布局
│   │   ├── api/                 # API 路由
│   │   ├── auth/                # 认证相关页面
│   │   ├── pricing/             # 定价页面
│   │   ├── error.tsx            # 全局错误页面
│   │   ├── loading.tsx          # 全局加载页面
│   │   ├── not-found.tsx        # 404 页面
│   │   ├── layout.tsx           # 根布局
│   │   └── page.tsx             # 首页
│   ├── components/              # 可重用组件
│   │   ├── ui/                  # 基础 UI 组件
│   │   └── layout/              # 布局组件
│   ├── constants/               # 常量定义
│   ├── contexts/                # React Context
│   │   └── AuthContext.tsx      # 认证上下文
│   ├── hooks/                   # 自定义 Hooks
│   ├── lib/                     # 库文件和配置
│   │   ├── supabase.ts          # Supabase 客户端配置
│   │   └── database.ts          # 数据库操作工具
│   ├── styles/                  # 样式文件
│   ├── types/                   # TypeScript 类型定义
│   └── utils/                   # 工具函数
├── supabase/                    # Supabase 配置
│   ├── migrations/              # 数据库迁移文件
│   │   ├── 20240101000000_initial_schema.sql
│   │   └── 20240101000001_complete_schema.sql
│   └── config.toml              # Supabase 配置文件
├── env.example                  # 环境变量示例
├── next.config.js               # Next.js 配置
├── tailwind.config.js           # Tailwind CSS 配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 项目依赖和脚本
```

> 📋 这个项目结构严格遵循 [Next.js 官方项目结构指南](https://nextjs.org/docs/app/getting-started/project-structure) 和最佳实践。

## 🎯 开发进度

### ✅ 已完成
- [x] 项目基础架构搭建
- [x] UI 组件库和设计系统 (shadcn/ui)
- [x] Supabase 后端服务配置
- [x] 用户认证系统
- [x] 响应式设计和移动端适配
- [x] 定价页面
- [x] 项目部署配置

### 🔄 进行中
- [ ] OpenAI API 集成
- [ ] 核心功能开发

### 📋 待开发
- [ ] 爆款标题生成器
- [ ] 品牌命名器
- [ ] 广告语生成器
- [ ] 随机创意提示器
- [ ] 灵感收藏夹
- [ ] 灵感广场社区
- [ ] AI 灵感助手
- [ ] 图像提示词生成器
- [ ] 创意改写器
- [ ] 标题优化器

## 🗄️ 数据库架构

项目使用 Supabase PostgreSQL 数据库，包含以下主要表：

- **profiles** - 用户配置信息
- **saved_inspirations** - 灵感收藏夹
- **inspiration_maps** - 灵感图谱
- **community_posts** - 社区内容
- **comments** - 评论系统
- **likes** - 点赞记录
- **user_sessions** - 用户会话
- **inspiration_timeline** - 灵感时间线

所有表都启用了行级安全策略 (RLS)，确保数据安全。

## 🚀 部署

### Vercel 部署 (推荐)

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

详细部署指南请参考：[部署文档](./DEPLOYMENT.md)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系我们

如有问题或建议，请联系：your-email@example.com
 