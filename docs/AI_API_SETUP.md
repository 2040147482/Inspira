# AI API 集成设置指南

本文档介绍如何配置 DeepSeek 和通义千问的 API 集成。

## 环境变量配置

在项目根目录创建 `.env.local` 文件，添加以下配置：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI API 配置
# DeepSeek API (可选)
DEEPSEEK_API_KEY=your_deepseek_api_key

# 通义千问 API (可选)
TONGYI_API_KEY=your_tongyi_api_key

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## DeepSeek API 配置

### 1. 获取 API 密钥

1. 访问 [DeepSeek 官网](https://platform.deepseek.com/)
2. 注册并登录账户
3. 进入 API 管理页面
4. 创建新的 API 密钥
5. 复制 API 密钥到 `.env.local` 文件

### 2. 支持的模型

- `deepseek-chat`: 通用对话模型
- `deepseek-coder`: 代码生成模型

### 3. API 端点

- 基础 URL: `https://api.deepseek.com/v1`
- 聊天完成: `/chat/completions`

## 通义千问 API 配置

### 1. 获取 API 密钥

1. 访问 [阿里云 DashScope](https://dashscope.aliyun.com/)
2. 注册并登录账户
3. 开通通义千问服务
4. 创建 API 密钥
5. 复制 API 密钥到 `.env.local` 文件

### 2. 支持的模型

- `qwen-turbo`: 通义千问 Turbo 版本
- `qwen-plus`: 通义千问 Plus 版本
- `qwen-max`: 通义千问 Max 版本

### 3. API 端点

- 基础 URL: `https://dashscope.aliyuncs.com/api/v1`
- 文本生成: `/services/aigc/text-generation/generation`

## 配置优先级

系统会按以下优先级选择 AI 提供商：

1. **通义千问** (优先)
2. **DeepSeek** (备选)

如果两个 API 都配置了，系统会优先使用通义千问。如果某个 API 调用失败，会自动回退到另一个。

## 模型配置

### 默认参数

```typescript
// 通义千问 Turbo
{
  temperature: 0.7,
  maxTokens: 4096,
  topP: 0.9,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
}

// DeepSeek Chat
{
  temperature: 0.7,
  maxTokens: 4096,
  topP: 0.9,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
}

// DeepSeek Coder
{
  temperature: 0.2,
  maxTokens: 4096,
  topP: 0.9,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
}
```

## API 使用示例

### 1. 通用文本生成

```typescript
import { aiService } from '@/lib/ai-service';

const response = await aiService.generateText({
  messages: [
    { role: 'system', content: '你是一个专业的助手。' },
    { role: 'user', content: '请介绍一下人工智能。' },
  ],
  temperature: 0.7,
  maxTokens: 1000,
});
```

### 2. 标题生成

```typescript
const title = await aiService.generateTitle(
  '人工智能',
  '微信公众号',
  '科技风格'
);
```

### 3. 品牌命名

```typescript
const brandName = await aiService.generateBrandName(
  '一款智能家居产品',
  '简洁现代'
);
```

### 4. 广告语生成

```typescript
const slogan = await aiService.generateSlogan(
  '智能家居',
  '让生活更便捷',
  '温暖亲切'
);
```

### 5. 创意提示生成

```typescript
const prompt = await aiService.generateCreativePrompt(
  '产品推广',
  '年轻白领',
  '情感共鸣'
);
```

## 前端使用

### 使用 AI Hook

```typescript
import { useAI } from '@/hooks/useAI';

function MyComponent() {
  const { generateTitle, loading, error, data } = useAI();

  const handleGenerate = async () => {
    try {
      const title = await generateTitle('关键词', '平台', '风格');
      console.log('生成的标题:', title);
    } catch (error) {
      console.error('生成失败:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? '生成中...' : '生成标题'}
      </button>
      {error && <p>错误: {error.message}</p>}
      {data && <p>结果: {data.content}</p>}
    </div>
  );
}
```

## 错误处理

### 常见错误

1. **API 密钥未配置**
   - 错误: `至少需要配置一个 AI 提供商的 API 密钥`
   - 解决: 检查 `.env.local` 文件中的 API 密钥配置

2. **API 调用失败**
   - 错误: `DeepSeek API 错误: 401 - Unauthorized`
   - 解决: 检查 API 密钥是否正确，账户是否有足够余额

3. **模型不可用**
   - 错误: `模型 xxx 不可用`
   - 解决: 检查模型名称是否正确，账户是否有访问权限

### 错误处理示例

```typescript
try {
  const response = await aiService.generateText(params);
  // 处理成功响应
} catch (error) {
  if (error.message.includes('API 密钥未配置')) {
    console.error('请配置 API 密钥');
  } else if (error.message.includes('API 错误')) {
    console.error('API 调用失败:', error.message);
  } else {
    console.error('未知错误:', error);
  }
}
```

## 成本控制

### 1. 设置使用限制

```typescript
// 在 API 调用前检查用户配额
const userQuota = await checkUserQuota(userId);
if (userQuota.remainingTokens < estimatedTokens) {
  throw new Error('用户配额不足');
}
```

### 2. 监控使用量

```typescript
// 记录 API 使用情况
await logAPIUsage({
  userId,
  provider: response.provider,
  model: response.model,
  tokens: response.usage?.totalTokens || 0,
  cost: calculateCost(response.usage),
});
```

## 部署配置

### Vercel 部署

在 Vercel 项目设置中添加环境变量：

1. 进入项目设置
2. 选择 "Environment Variables"
3. 添加所有必要的环境变量
4. 重新部署项目

### 本地开发

1. 复制 `.env.example` 为 `.env.local`
2. 填入实际的 API 密钥
3. 重启开发服务器

## 测试

### 1. 测试 API 连接

```bash
# 测试 DeepSeek API
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'

# 测试通义千问 API
curl -X POST http://localhost:3000/api/ai/title \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": "测试",
    "platform": "测试平台",
    "style": "测试风格"
  }'
```

### 2. 测试模型列表

```bash
curl http://localhost:3000/api/ai/generate
```

## 故障排除

### 1. API 密钥问题

- 检查 API 密钥是否正确复制
- 确认账户有足够的余额
- 验证 API 密钥权限

### 2. 网络问题

- 检查网络连接
- 确认防火墙设置
- 验证 DNS 解析

### 3. 模型访问问题

- 确认账户有模型访问权限
- 检查模型名称是否正确
- 验证服务区域设置

## 更新日志

- **v1.0.0**: 初始版本，支持 DeepSeek 和通义千问
- 支持模型切换和回退机制
- 完整的错误处理和日志记录
- 前端 Hook 和 API 路由 