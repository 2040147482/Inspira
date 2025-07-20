# 数据库架构文档

本文档详细描述了 Inspira 项目的数据库架构设计，包括所有表的结构、字段说明、关系图和最佳实践。

## 数据库概览

Inspira 使用 Supabase 作为后端服务，基于 PostgreSQL 数据库。数据库设计遵循以下原则：

- **用户中心设计**: 所有数据都与用户关联
- **行级安全策略 (RLS)**: 确保数据安全和隐私
- **自动时间戳**: 所有表都有创建和更新时间
- **JSON 数据存储**: 灵活存储复杂数据结构
- **索引优化**: 提高查询性能

## 表结构总览

| 表名 | 中文名称 | 主要功能 | 记录数预估 |
|------|----------|----------|------------|
| `profiles` | 用户配置表 | 存储用户个人资料 | 10K+ |
| `saved_inspirations` | 灵感收藏夹 | 用户收藏的创意内容 | 100K+ |
| `inspiration_maps` | 灵感图谱 | 创意思维导图 | 10K+ |
| `community_posts` | 社区内容 | 用户分享的帖子 | 50K+ |
| `comments` | 评论表 | 帖子评论和回复 | 200K+ |
| `likes` | 点赞表 | 用户点赞记录 | 500K+ |
| `user_sessions` | 用户会话 | 工具使用会话 | 1M+ |
| `inspiration_timeline` | 灵感时间线 | 用户活动历史 | 500K+ |

## 详细表结构

### 1. profiles - 用户配置表

**功能**: 存储用户的个人资料信息，包括基本信息、订阅状态和社交信息

**字段说明**:

| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| `id` | UUID | PK, FK | 用户ID，关联 auth.users 表的主键 |
| `username` | TEXT | UNIQUE | 用户名，用户的唯一标识符 |
| `full_name` | TEXT | - | 全名，用户的真实姓名或显示名称 |
| `avatar_url` | TEXT | - | 头像URL，用户头像图片的存储地址 |
| `bio` | TEXT | - | 个人简介，支持Markdown格式 |
| `website` | TEXT | - | 个人网站，用户的个人网站或社交媒体链接 |
| `location` | TEXT | - | 地理位置，用户所在的城市或地区信息 |
| `subscription_tier` | TEXT | CHECK | 订阅等级：free/pro/enterprise |
| `created_at` | TIMESTAMPTZ | DEFAULT | 创建时间 |
| `updated_at` | TIMESTAMPTZ | DEFAULT | 更新时间 |

**索引**:
- `id` (主键索引)
- `username` (唯一索引)

**RLS 策略**:
- 所有人可以查看用户资料
- 用户只能修改自己的资料

### 2. saved_inspirations - 灵感收藏夹表

**功能**: 存储用户收藏的创意内容，包括标题、品牌名、广告语等

**字段说明**:

| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| `id` | UUID | PK | 记录ID，灵感收藏记录的唯一标识符 |
| `user_id` | UUID | FK, NOT NULL | 用户ID，收藏该灵感的用户 |
| `title` | TEXT | NOT NULL | 标题，灵感内容的标题或名称 |
| `content` | TEXT | NOT NULL | 内容，灵感的具体内容 |
| `category` | TEXT | NOT NULL | 分类，如：title/brand_name/slogan/prompt |
| `tags` | TEXT[] | DEFAULT | 标签数组，用于分类和搜索 |
| `is_public` | BOOLEAN | DEFAULT | 是否公开，控制对其他用户可见性 |
| `created_at` | TIMESTAMPTZ | DEFAULT | 创建时间 |
| `updated_at` | TIMESTAMPTZ | DEFAULT | 更新时间 |

**索引**:
- `idx_saved_inspirations_user_id` (user_id)
- `idx_saved_inspirations_category` (category)
- `idx_saved_inspirations_tags` (tags, GIN)

**RLS 策略**:
- 用户可以查看自己的收藏
- 用户可以查看公开的收藏
- 用户只能管理自己的收藏

### 3. inspiration_maps - 灵感图谱表

**功能**: 存储用户的创意思维导图和灵感关联图

**字段说明**:

| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| `id` | UUID | PK | 图谱ID，灵感图谱的唯一标识符 |
| `user_id` | UUID | FK, NOT NULL | 用户ID，创建该图谱的用户 |
| `title` | TEXT | NOT NULL | 图谱标题，灵感图谱的名称 |
| `description` | TEXT | - | 图谱描述，详细说明和用途描述 |
| `nodes` | JSONB | DEFAULT | 节点数据，JSON格式存储节点信息 |
| `edges` | JSONB | DEFAULT | 边数据，JSON格式存储连接线信息 |
| `is_public` | BOOLEAN | DEFAULT | 是否公开，控制对其他用户可见性 |
| `created_at` | TIMESTAMPTZ | DEFAULT | 创建时间 |
| `updated_at` | TIMESTAMPTZ | DEFAULT | 更新时间 |

**索引**:
- `idx_inspiration_maps_user_id` (user_id)

**RLS 策略**:
- 用户可以查看自己的图谱
- 用户可以查看公开的图谱
- 用户只能管理自己的图谱

### 4. community_posts - 社区内容表

**功能**: 存储用户在灵感广场发布的帖子和分享内容

**字段说明**:

| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| `id` | UUID | PK | 帖子ID，社区帖子的唯一标识符 |
| `user_id` | UUID | FK, NOT NULL | 用户ID，发布该帖子的用户 |
| `title` | TEXT | NOT NULL | 帖子标题，社区帖子的标题 |
| `content` | TEXT | NOT NULL | 帖子内容，详细内容，支持Markdown |
| `category` | TEXT | NOT NULL | 内容分类，如：share/help/discuss/showcase |
| `tags` | TEXT[] | DEFAULT | 标签数组，用于分类和搜索 |
| `likes_count` | INTEGER | DEFAULT | 点赞数，由触发器自动更新 |
| `comments_count` | INTEGER | DEFAULT | 评论数，由触发器自动更新 |
| `views_count` | INTEGER | DEFAULT | 浏览量，该帖子的浏览次数 |
| `is_featured` | BOOLEAN | DEFAULT | 是否精选，标记是否为精选内容 |
| `status` | TEXT | CHECK | 发布状态：draft/published/archived |
| `created_at` | TIMESTAMPTZ | DEFAULT | 创建时间 |
| `updated_at` | TIMESTAMPTZ | DEFAULT | 更新时间 |

**索引**:
- `idx_community_posts_user_id` (user_id)
- `idx_community_posts_category` (category)
- `idx_community_posts_status` (status)
- `idx_community_posts_created_at` (created_at DESC)
- `idx_community_posts_tags` (tags, GIN)

**RLS 策略**:
- 所有人可以查看已发布的帖子
- 用户可以查看自己的所有帖子
- 用户只能管理自己的帖子

### 5. comments - 评论表

**功能**: 存储用户对社区帖子的评论和回复

**字段说明**:

| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| `id` | UUID | PK | 评论ID，评论的唯一标识符 |
| `user_id` | UUID | FK, NOT NULL | 用户ID，发表该评论的用户 |
| `post_id` | UUID | FK, NOT NULL | 帖子ID，被评论的社区帖子 |
| `parent_id` | UUID | FK | 父评论ID，支持多级回复 |
| `content` | TEXT | NOT NULL | 评论内容，支持Markdown格式 |
| `likes_count` | INTEGER | DEFAULT | 点赞数，由触发器自动更新 |
| `created_at` | TIMESTAMPTZ | DEFAULT | 创建时间 |
| `updated_at` | TIMESTAMPTZ | DEFAULT | 更新时间 |

**索引**:
- `idx_comments_post_id` (post_id)
- `idx_comments_user_id` (user_id)
- `idx_comments_parent_id` (parent_id)

**RLS 策略**:
- 所有人可以查看评论
- 用户只能管理自己的评论

### 6. likes - 点赞表

**功能**: 存储用户对帖子、评论、灵感的点赞记录

**字段说明**:

| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| `id` | UUID | PK | 点赞ID，点赞记录的唯一标识符 |
| `user_id` | UUID | FK, NOT NULL | 用户ID，进行点赞的用户 |
| `target_type` | TEXT | NOT NULL, CHECK | 目标类型：post/comment/inspiration |
| `target_id` | UUID | NOT NULL | 目标ID，被点赞内容的具体ID |
| `created_at` | TIMESTAMPTZ | DEFAULT | 创建时间 |

**约束**:
- `UNIQUE(user_id, target_type, target_id)` - 防止重复点赞

**索引**:
- `idx_likes_target` (target_type, target_id)
- `idx_likes_user_id` (user_id)

**RLS 策略**:
- 所有人可以查看点赞记录
- 用户只能管理自己的点赞

### 7. user_sessions - 用户会话记录表

**功能**: 存储用户使用各种工具时的会话状态和数据

**字段说明**:

| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| `id` | UUID | PK | 会话ID，会话记录的唯一标识符 |
| `user_id` | UUID | FK, NOT NULL | 用户ID，创建该会话的用户 |
| `session_type` | TEXT | NOT NULL, CHECK | 会话类型，工具类型 |
| `session_data` | JSONB | DEFAULT | 会话数据，JSON格式存储工具状态 |
| `created_at` | TIMESTAMPTZ | DEFAULT | 创建时间 |

**session_type 可选值**:
- `title_generator` - 标题生成器
- `brand_namer` - 品牌命名器
- `slogan_generator` - 广告语生成器
- `creative_prompter` - 创意提示器
- `ai_assistant` - AI助手
- `image_prompt` - 图像提示词
- `rewriter` - 改写器
- `title_optimizer` - 标题优化器
- `inspiration_map` - 灵感图谱
- `timeline` - 时间线

**索引**:
- `idx_user_sessions_user_id` (user_id)
- `idx_user_sessions_type` (session_type)

**RLS 策略**:
- 用户只能访问自己的会话记录

### 8. inspiration_timeline - 灵感时间线表

**功能**: 记录用户的创意活动历史，形成个人创意时间线

**字段说明**:

| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| `id` | UUID | PK | 事件ID，时间线事件的唯一标识符 |
| `user_id` | UUID | FK, NOT NULL | 用户ID，创建该事件的用户 |
| `event_type` | TEXT | NOT NULL | 事件类型，创意活动的类型 |
| `title` | TEXT | NOT NULL | 事件标题，时间线事件的标题 |
| `description` | TEXT | - | 事件描述，时间线事件的详细描述 |
| `metadata` | JSONB | DEFAULT | 元数据，事件的附加信息 |
| `created_at` | TIMESTAMPTZ | DEFAULT | 创建时间 |

**event_type 示例**:
- `created_inspiration` - 创建灵感
- `shared_post` - 分享帖子
- `generated_title` - 生成标题
- `joined_challenge` - 参与挑战
- `earned_badge` - 获得徽章
- `completed_tutorial` - 完成教程

**索引**:
- `idx_inspiration_timeline_user_id` (user_id)
- `idx_inspiration_timeline_event_type` (event_type)
- `idx_inspiration_timeline_created_at` (created_at DESC)

**RLS 策略**:
- 用户只能访问自己的时间线记录

## 数据库函数

### 1. handle_new_user()
**功能**: 当新用户注册时自动创建用户配置记录
**触发**: 在 auth.users 表插入新记录后

### 2. handle_updated_at()
**功能**: 自动更新记录的 updated_at 字段为当前时间
**触发**: 在表更新前

### 3. update_likes_count()
**功能**: 当点赞记录变化时自动更新对应内容的点赞数
**触发**: 在 likes 表插入或删除记录后

### 4. update_comments_count()
**功能**: 当评论记录变化时自动更新对应帖子的评论数
**触发**: 在 comments 表插入或删除记录后

## 索引策略

### 性能优化索引
1. **用户相关查询**: 所有表都有 user_id 索引
2. **时间排序**: 主要表都有 created_at 降序索引
3. **分类查询**: community_posts 和 saved_inspirations 有 category 索引
4. **标签搜索**: 使用 GIN 索引优化数组搜索
5. **状态查询**: community_posts 有 status 索引

### 复合索引考虑
- `(user_id, created_at)` - 用户时间线查询
- `(category, status, created_at)` - 社区内容筛选
- `(target_type, target_id)` - 点赞状态查询

## 数据关系图

```
auth.users (1) ←→ (1) profiles
     ↓
     ↓ (1:N)
     ↓
┌─────────────────────────────────────────────────────────────┐
│                    user_sessions                            │
│                    inspiration_timeline                     │
│                    saved_inspirations                       │
│                    inspiration_maps                         │
└─────────────────────────────────────────────────────────────┘
     ↓
     ↓ (1:N)
     ↓
community_posts (1) ←→ (N) comments
     ↓                    ↓
     ↓ (1:N)              ↓ (1:N)
     ↓                    ↓
   likes ←───────────────┘
```

## 数据安全

### 行级安全策略 (RLS)
- 所有表都启用了 RLS
- 用户只能访问自己的数据
- 支持公开/私有内容访问控制
- 管理员可以查看所有数据

### 数据验证
- 使用 CHECK 约束确保数据完整性
- 外键约束维护引用完整性
- 唯一约束防止重复数据

### 审计追踪
- 所有表都有创建和更新时间
- 自动触发器维护时间戳
- 用户操作记录在时间线表中

## 性能优化

### 查询优化
1. **分页查询**: 使用 LIMIT/OFFSET 或游标分页
2. **缓存策略**: 热门内容使用 Redis 缓存
3. **连接优化**: 避免 N+1 查询问题
4. **索引覆盖**: 尽可能使用索引覆盖查询

### 存储优化
1. **JSON 字段**: 灵活存储复杂数据结构
2. **数组字段**: 高效存储标签等列表数据
3. **压缩存储**: 大文本字段使用压缩
4. **分区策略**: 按时间分区大表

## 扩展性考虑

### 水平扩展
- 支持读写分离
- 分片策略准备
- 缓存层设计

### 垂直扩展
- 字段类型优化
- 索引策略调整
- 查询优化

## 监控和维护

### 性能监控
- 慢查询日志
- 索引使用统计
- 连接池监控

### 数据维护
- 定期清理过期数据
- 索引重建
- 统计信息更新

## 最佳实践

### 开发建议
1. 始终使用参数化查询防止 SQL 注入
2. 合理使用事务确保数据一致性
3. 避免在循环中执行数据库操作
4. 使用连接池管理数据库连接

### 部署建议
1. 生产环境启用 SSL 连接
2. 定期备份数据库
3. 监控数据库性能指标
4. 设置合理的连接限制

---

*本文档会随着数据库架构的演进持续更新。* 