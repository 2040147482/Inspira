-- 为数据库表字段添加描述信息
-- 这个迁移文件为所有表的字段添加详细的注释，提高数据库的可读性和维护性

-- ========================================
-- profiles 表字段描述
-- ========================================
COMMENT ON
TABLE public.profiles IS '用户配置表 - 存储用户的个人资料信息，包括基本信息、订阅状态和社交信息';

COMMENT ON COLUMN public.profiles.id IS '用户ID - 关联 auth.users 表的主键，与认证用户一一对应';

COMMENT ON COLUMN public.profiles.username IS '用户名 - 用户的唯一标识符，用于显示和@提及功能';

COMMENT ON COLUMN public.profiles.full_name IS '全名 - 用户的真实姓名或显示名称';

COMMENT ON COLUMN public.profiles.avatar_url IS '头像URL - 用户头像图片的存储地址';

COMMENT ON COLUMN public.profiles.bio IS '个人简介 - 用户的自我介绍或个性签名，支持Markdown格式';

COMMENT ON COLUMN public.profiles.website IS '个人网站 - 用户的个人网站或社交媒体链接';

COMMENT ON COLUMN public.profiles.location IS '地理位置 - 用户所在的城市或地区信息';

COMMENT ON COLUMN public.profiles.subscription_tier IS '订阅等级 - 用户的付费订阅级别：free(免费)、pro(专业版)、enterprise(企业版)';

COMMENT ON COLUMN public.profiles.created_at IS '创建时间 - 用户配置记录的创建时间戳';

COMMENT ON COLUMN public.profiles.updated_at IS '更新时间 - 用户配置记录的最后修改时间戳';

-- ========================================
-- saved_inspirations 表字段描述
-- ========================================
COMMENT ON
TABLE public.saved_inspirations IS '灵感收藏夹表 - 存储用户收藏的创意内容，包括标题、品牌名、广告语等';

COMMENT ON COLUMN public.saved_inspirations.id IS '记录ID - 灵感收藏记录的唯一标识符';

COMMENT ON COLUMN public.saved_inspirations.user_id IS '用户ID - 收藏该灵感的用户，关联 auth.users 表';

COMMENT ON COLUMN public.saved_inspirations.title IS '标题 - 灵感内容的标题或名称';

COMMENT ON COLUMN public.saved_inspirations.content IS '内容 - 灵感的具体内容，如生成的标题、品牌名、广告语等';

COMMENT ON COLUMN public.saved_inspirations.category IS '分类 - 灵感内容的分类，如：title(标题)、brand_name(品牌名)、slogan(广告语)、prompt(提示词)等';

COMMENT ON COLUMN public.saved_inspirations.tags IS '标签数组 - 用于分类和搜索的标签，支持多标签';

COMMENT ON COLUMN public.saved_inspirations.is_public IS '是否公开 - 控制灵感是否对其他用户可见，true为公开，false为私有';

COMMENT ON COLUMN public.saved_inspirations.created_at IS '创建时间 - 灵感收藏记录的创建时间戳';

COMMENT ON COLUMN public.saved_inspirations.updated_at IS '更新时间 - 灵感收藏记录的最后修改时间戳';

-- ========================================
-- inspiration_maps 表字段描述
-- ========================================
COMMENT ON
TABLE public.inspiration_maps IS '灵感图谱表 - 存储用户的创意思维导图和灵感关联图';

COMMENT ON COLUMN public.inspiration_maps.id IS '图谱ID - 灵感图谱的唯一标识符';

COMMENT ON COLUMN public.inspiration_maps.user_id IS '用户ID - 创建该图谱的用户，关联 auth.users 表';

COMMENT ON COLUMN public.inspiration_maps.title IS '图谱标题 - 灵感图谱的名称';

COMMENT ON COLUMN public.inspiration_maps.description IS '图谱描述 - 灵感图谱的详细说明和用途描述';

COMMENT ON COLUMN public.inspiration_maps.nodes IS '节点数据 - 图谱中的节点信息，JSON格式存储节点位置、内容、样式等';

COMMENT ON COLUMN public.inspiration_maps.edges IS '边数据 - 图谱中的连接线信息，JSON格式存储边的起点、终点、样式等';

COMMENT ON COLUMN public.inspiration_maps.is_public IS '是否公开 - 控制图谱是否对其他用户可见，true为公开，false为私有';

COMMENT ON COLUMN public.inspiration_maps.created_at IS '创建时间 - 灵感图谱的创建时间戳';

COMMENT ON COLUMN public.inspiration_maps.updated_at IS '更新时间 - 灵感图谱的最后修改时间戳';

-- ========================================
-- community_posts 表字段描述
-- ========================================
COMMENT ON
TABLE public.community_posts IS '社区内容表 - 存储用户在灵感广场发布的帖子和分享内容';

COMMENT ON COLUMN public.community_posts.id IS '帖子ID - 社区帖子的唯一标识符';

COMMENT ON COLUMN public.community_posts.user_id IS '用户ID - 发布该帖子的用户，关联 auth.users 表';

COMMENT ON COLUMN public.community_posts.title IS '帖子标题 - 社区帖子的标题';

COMMENT ON COLUMN public.community_posts.content IS '帖子内容 - 社区帖子的详细内容，支持Markdown格式';

COMMENT ON COLUMN public.community_posts.category IS '内容分类 - 帖子的分类，如：分享(share)、求助(help)、讨论(discuss)、展示(showcase)等';

COMMENT ON COLUMN public.community_posts.tags IS '标签数组 - 用于分类和搜索的标签，支持多标签';

COMMENT ON COLUMN public.community_posts.likes_count IS '点赞数 - 该帖子获得的点赞数量，由触发器自动更新';

COMMENT ON COLUMN public.community_posts.comments_count IS '评论数 - 该帖子获得的评论数量，由触发器自动更新';

COMMENT ON COLUMN public.community_posts.views_count IS '浏览量 - 该帖子的浏览次数';

COMMENT ON COLUMN public.community_posts.is_featured IS '是否精选 - 标记是否为精选内容，true为精选，false为普通';

COMMENT ON COLUMN public.community_posts.status IS '发布状态 - 帖子的状态：draft(草稿)、published(已发布)、archived(已归档)';

COMMENT ON COLUMN public.community_posts.created_at IS '创建时间 - 社区帖子的创建时间戳';

COMMENT ON COLUMN public.community_posts.updated_at IS '更新时间 - 社区帖子的最后修改时间戳';

-- ========================================
-- comments 表字段描述
-- ========================================
COMMENT ON TABLE public.comments IS '评论表 - 存储用户对社区帖子的评论和回复';

COMMENT ON COLUMN public.comments.id IS '评论ID - 评论的唯一标识符';

COMMENT ON COLUMN public.comments.user_id IS '用户ID - 发表该评论的用户，关联 auth.users 表';

COMMENT ON COLUMN public.comments.post_id IS '帖子ID - 被评论的社区帖子，关联 community_posts 表';

COMMENT ON COLUMN public.comments.parent_id IS '父评论ID - 如果是回复其他评论，则关联父评论的ID，支持多级回复';

COMMENT ON COLUMN public.comments.content IS '评论内容 - 评论的具体内容，支持Markdown格式';

COMMENT ON COLUMN public.comments.likes_count IS '点赞数 - 该评论获得的点赞数量，由触发器自动更新';

COMMENT ON COLUMN public.comments.created_at IS '创建时间 - 评论的创建时间戳';

COMMENT ON COLUMN public.comments.updated_at IS '更新时间 - 评论的最后修改时间戳';

-- ========================================
-- likes 表字段描述
-- ========================================
COMMENT ON TABLE public.likes IS '点赞表 - 存储用户对帖子、评论、灵感的点赞记录';

COMMENT ON COLUMN public.likes.id IS '点赞ID - 点赞记录的唯一标识符';

COMMENT ON COLUMN public.likes.user_id IS '用户ID - 进行点赞的用户，关联 auth.users 表';

COMMENT ON COLUMN public.likes.target_type IS '目标类型 - 被点赞内容的类型：post(帖子)、comment(评论)、inspiration(灵感)';

COMMENT ON COLUMN public.likes.target_id IS '目标ID - 被点赞内容的具体ID，根据target_type关联对应表';

COMMENT ON COLUMN public.likes.created_at IS '创建时间 - 点赞记录的创建时间戳';

-- ========================================
-- user_sessions 表字段描述
-- ========================================
COMMENT ON
TABLE public.user_sessions IS '用户会话记录表 - 存储用户使用各种工具时的会话状态和数据';

COMMENT ON COLUMN public.user_sessions.id IS '会话ID - 会话记录的唯一标识符';

COMMENT ON COLUMN public.user_sessions.user_id IS '用户ID - 创建该会话的用户，关联 auth.users 表';

COMMENT ON COLUMN public.user_sessions.session_type IS '会话类型 - 工具类型：title_generator(标题生成器)、brand_namer(品牌命名器)、slogan_generator(广告语生成器)、creative_prompter(创意提示器)、ai_assistant(AI助手)、image_prompt(图像提示词)、rewriter(改写器)、title_optimizer(标题优化器)、inspiration_map(灵感图谱)、timeline(时间线)';

COMMENT ON COLUMN public.user_sessions.session_data IS '会话数据 - 会话的详细数据，JSON格式存储工具状态、历史记录、配置等';

COMMENT ON COLUMN public.user_sessions.created_at IS '创建时间 - 会话记录的创建时间戳';

-- ========================================
-- inspiration_timeline 表字段描述
-- ========================================
COMMENT ON
TABLE public.inspiration_timeline IS '灵感时间线表 - 记录用户的创意活动历史，形成个人创意时间线';

COMMENT ON COLUMN public.inspiration_timeline.id IS '事件ID - 时间线事件的唯一标识符';

COMMENT ON COLUMN public.inspiration_timeline.user_id IS '用户ID - 创建该事件的用户，关联 auth.users 表';

COMMENT ON COLUMN public.inspiration_timeline.event_type IS '事件类型 - 创意活动的类型，如：created_inspiration(创建灵感)、shared_post(分享帖子)、generated_title(生成标题)、joined_challenge(参与挑战)等';

COMMENT ON COLUMN public.inspiration_timeline.title IS '事件标题 - 时间线事件的标题';

COMMENT ON COLUMN public.inspiration_timeline.description IS '事件描述 - 时间线事件的详细描述';

COMMENT ON COLUMN public.inspiration_timeline.metadata IS '元数据 - 事件的附加信息，JSON格式存储相关链接、图片、统计数据等';

COMMENT ON COLUMN public.inspiration_timeline.created_at IS '创建时间 - 时间线事件的创建时间戳';

-- ========================================
-- 函数和触发器描述
-- ========================================
COMMENT ON FUNCTION public.handle_new_user () IS '新用户处理函数 - 当新用户注册时自动创建用户配置记录';

COMMENT ON FUNCTION public.handle_updated_at () IS '更新时间处理函数 - 自动更新记录的updated_at字段为当前时间';

COMMENT ON FUNCTION public.update_likes_count () IS '点赞计数更新函数 - 当点赞记录变化时自动更新对应内容的点赞数';

COMMENT ON FUNCTION public.update_comments_count () IS '评论计数更新函数 - 当评论记录变化时自动更新对应帖子的评论数';

-- ========================================
-- 索引描述
-- ========================================
COMMENT ON INDEX public.idx_saved_inspirations_user_id IS '灵感收藏用户索引 - 提高按用户查询收藏内容的性能';

COMMENT ON INDEX public.idx_saved_inspirations_category IS '灵感收藏分类索引 - 提高按分类查询收藏内容的性能';

COMMENT ON INDEX public.idx_saved_inspirations_tags IS '灵感收藏标签索引 - 提高按标签搜索收藏内容的性能';

COMMENT ON INDEX public.idx_inspiration_maps_user_id IS '灵感图谱用户索引 - 提高按用户查询图谱的性能';

COMMENT ON INDEX public.idx_community_posts_user_id IS '社区帖子用户索引 - 提高按用户查询帖子的性能';

COMMENT ON INDEX public.idx_community_posts_category IS '社区帖子分类索引 - 提高按分类查询帖子的性能';

COMMENT ON INDEX public.idx_community_posts_status IS '社区帖子状态索引 - 提高按状态查询帖子的性能';

COMMENT ON INDEX public.idx_community_posts_created_at IS '社区帖子创建时间索引 - 提高按时间排序查询帖子的性能';

COMMENT ON INDEX public.idx_community_posts_tags IS '社区帖子标签索引 - 提高按标签搜索帖子的性能';

COMMENT ON INDEX public.idx_comments_post_id IS '评论帖子索引 - 提高查询帖子评论的性能';

COMMENT ON INDEX public.idx_comments_user_id IS '评论用户索引 - 提高按用户查询评论的性能';

COMMENT ON INDEX public.idx_comments_parent_id IS '评论父级索引 - 提高查询评论回复的性能';

COMMENT ON INDEX public.idx_likes_target IS '点赞目标索引 - 提高查询点赞状态的性能';

COMMENT ON INDEX public.idx_likes_user_id IS '点赞用户索引 - 提高按用户查询点赞记录的性能';

COMMENT ON INDEX public.idx_user_sessions_user_id IS '用户会话用户索引 - 提高按用户查询会话的性能';

COMMENT ON INDEX public.idx_user_sessions_type IS '用户会话类型索引 - 提高按类型查询会话的性能';

COMMENT ON INDEX public.idx_inspiration_timeline_user_id IS '灵感时间线用户索引 - 提高按用户查询时间线的性能';

COMMENT ON INDEX public.idx_inspiration_timeline_event_type IS '灵感时间线事件类型索引 - 提高按事件类型查询时间线的性能';

COMMENT ON INDEX public.idx_inspiration_timeline_created_at IS '灵感时间线创建时间索引 - 提高按时间排序查询时间线的性能';