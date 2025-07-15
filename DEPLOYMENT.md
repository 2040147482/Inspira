# 🚀 IdeaBox Vercel 部署指南

## 快速部署

### 1. Vercel 部署步骤

1. **连接 GitHub 仓库**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库：`https://github.com/2040147482/Inspira.git`

2. **配置环境变量**（可选，但推荐）
   在 Vercel 项目设置中添加以下环境变量：
   
   ```bash
   # Supabase 配置（认证功能需要）
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **部署设置**
   - Framework Preset: Next.js
   - Node.js Version: 18.x 或更高
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 2. 环境变量配置

#### 获取 Supabase 配置：

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 创建新项目或选择现有项目
3. 在 Project Settings > API 中获取：
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - Anon/Public Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

#### 在 Vercel 中设置环境变量：

1. 进入 Vercel 项目设置
2. 选择 "Environment Variables"
3. 添加上述变量

### 3. 无 Supabase 配置部署

项目已经优化为**可以在没有 Supabase 配置的情况下正常部署**：

- ✅ 网站所有页面正常工作
- ✅ UI 组件完全功能
- ⚠️ 认证功能将被禁用
- ⚠️ 用户相关功能不可用

### 4. 部署后验证

部署成功后，检查以下功能：

- [ ] 主页加载正常
- [ ] 定价页面显示正确
- [ ] 移动端响应式设计
- [ ] 创意工具页面（即使没有后端）
- [ ] 认证按钮（会显示但功能受限）

### 5. 故障排除

#### 常见部署错误：

1. **构建失败**
   - 检查 Node.js 版本 (>=18)
   - 确保所有依赖正确安装

2. **运行时错误**
   - 检查环境变量配置
   - 查看 Vercel 函数日志

3. **Supabase 连接问题**
   - 验证环境变量值
   - 检查 Supabase 项目状态

#### 调试命令：

```bash
# 本地构建测试
npm run build

# 本地生产环境测试
npm run start

# 类型检查
npm run type-check
```

### 6. 后续配置

部署成功后，你可以：

1. **添加自定义域名**
2. **配置 Supabase 认证**
3. **设置分析工具**
4. **添加 SEO 优化**

## 📞 需要帮助？

如果遇到部署问题，请检查：
- Vercel 构建日志
- 浏览器开发者工具控制台
- 网络请求状态

## 🔗 相关链接

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [Supabase 集成指南](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) 