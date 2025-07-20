# Supabase 后端服务配置指南

## 概述

本文档详细说明了如何配置 Supabase 后端服务，包括数据库设置、认证配置和表结构创建。

## 1. 创建 Supabase 项目

### 1.1 访问 Supabase
1. 访问 [Supabase 官网](https://supabase.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project" 创建新项目

### 1.2 项目配置
- **项目名称**: `inspira-ideabox` (或你喜欢的名称)
- **数据库密码**: 设置一个强密码
- **地区**: 选择离你最近的地区 (推荐 `East Asia (Tokyo)` 或 `Southeast Asia (Singapore)`)
- **定价计划**: 选择 Free 计划开始

## 2. 获取项目配置信息

### 2.1 获取 API 密钥
1. 在项目仪表板中，进入 **Settings** > **API**
2. 复制以下信息：
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: 以 `eyJ...` 开头的长字符串

### 2.2 配置环境变量
创建 `.env.local` 文件并添加以下配置：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# 其他配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Inspira
```

## 3. 数据库表结构

项目包含以下主要数据表：

### 3.1 用户配置表 (`profiles`)
- 存储用户基本信息
- 包含订阅等级、个人资料等

### 3.2 灵感收藏夹表 (`saved_inspirations`)
- 存储用户保存的灵感内容
- 支持分类、标签、公开/私有设置

### 3.3 灵感图谱表 (`inspiration_maps`)
- 存储用户的灵感脑图
- 支持节点和边的 JSON 数据

### 3.4 社区内容表 (`community_posts`)
- 存储社区分享的灵感内容
- 支持点赞、评论、浏览量统计

### 3.5 评论表 (`comments`)
- 存储社区帖子的评论
- 支持嵌套评论结构

### 3.6 点赞表 (`likes`)
- 存储用户点赞记录
- 支持多种内容类型的点赞

### 3.7 用户会话表 (`user_sessions`)
- 存储用户使用各功能工具的会话数据
- 用于分析和个性化推荐

### 3.8 灵感时间线表 (`inspiration_timeline`)
- 记录用户的创作历程
- 支持事件分类和元数据

## 4. 应用数据库迁移

### 4.1 使用 Supabase CLI (推荐)

1. 安装 Supabase CLI:
```bash
npm install -g supabase
```

2. 登录 Supabase:
```bash
supabase login
```

3. 链接项目:
```bash
supabase link --project-ref your-project-id
```

4. 应用迁移:
```bash
supabase db push
```

### 4.2 使用 Supabase Dashboard

1. 进入项目仪表板
2. 进入 **SQL Editor**
3. 复制并执行 `supabase/migrations/20240101000000_initial_schema.sql`
4. 复制并执行 `supabase/migrations/20240101000001_complete_schema.sql`

## 5. 认证配置

### 5.1 启用邮箱认证
1. 进入 **Authentication** > **Providers**
2. 确保 **Email** 已启用
3. 配置邮箱模板 (可选)

### 5.2 配置重定向 URL
1. 进入 **Authentication** > **URL Configuration**
2. 添加以下 URL:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback` (生产环境)

### 5.3 社交登录 (可选)
1. 进入 **Authentication** > **Providers**
2. 配置 Google、GitHub 等社交登录
3. 添加相应的重定向 URL

## 6. 行级安全策略 (RLS)

所有表都已启用 RLS 并配置了相应的策略：

- **用户数据**: 只能访问自己的数据
- **公开内容**: 所有人都可以查看公开的灵感
- **社区内容**: 已发布的帖子所有人都可以查看
- **评论系统**: 所有人都可以查看评论，但只能编辑自己的评论

## 7. 测试配置

### 7.1 验证连接
启动开发服务器并检查控制台输出：
```bash
npm run dev
```

应该看到：
```
✅ Supabase配置已找到
URL: https://your-project-id.supabase.co
Key开头: eyJhbGciOiJIUzI1NiIs...
✅ Supabase客户端创建成功
```

### 7.2 测试认证
1. 访问 `/auth/register` 页面
2. 尝试注册新用户
3. 检查 Supabase Dashboard 中的用户列表

### 7.3 测试数据库操作
1. 登录后尝试保存灵感
2. 检查数据库表中是否有新记录

## 8. 生产环境部署

### 8.1 Vercel 部署
1. 在 Vercel 项目设置中添加环境变量
2. 确保生产环境的 URL 已添加到 Supabase 重定向列表

### 8.2 数据库备份
1. 定期备份数据库
2. 使用 Supabase 的自动备份功能

## 9. 监控和维护

### 9.1 性能监控
- 使用 Supabase Dashboard 监控查询性能
- 关注慢查询和错误日志

### 9.2 数据清理
- 定期清理过期的会话数据
- 归档旧的社区内容

## 10. 故障排除

### 10.1 常见问题

**问题**: 认证失败
**解决**: 检查重定向 URL 配置

**问题**: 数据库连接失败
**解决**: 验证 API 密钥和项目 URL

**问题**: RLS 策略阻止操作
**解决**: 检查用户权限和策略配置

### 10.2 获取帮助
- [Supabase 文档](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 11. 安全最佳实践

1. **环境变量**: 永远不要将 API 密钥提交到代码仓库
2. **RLS 策略**: 确保所有表都有适当的访问控制
3. **输入验证**: 在应用层验证所有用户输入
4. **定期更新**: 保持 Supabase 客户端库为最新版本
5. **监控**: 定期检查异常访问模式

## 12. 下一步

配置完成后，可以继续：
1. [OpenAI API 集成](./OPENAI_SETUP.md)
2. [用户认证和权限管理](./AUTH_SETUP.md)
3. [功能模块开发](./FEATURES.md) 