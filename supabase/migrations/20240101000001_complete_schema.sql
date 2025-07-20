-- 完善用户配置表
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free' CHECK (
    subscription_tier IN ('free', 'pro', 'enterprise')
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website TEXT;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location TEXT;

-- 创建灵感收藏夹表
CREATE TABLE IF NOT EXISTS public.saved_inspirations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建灵感图谱表
CREATE TABLE IF NOT EXISTS public.inspiration_maps (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    nodes JSONB DEFAULT '[]',
    edges JSONB DEFAULT '[]',
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- 创建社区内容表
CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.community_posts (id) ON DELETE CASCADE NOT NULL,
    parent_id UUID REFERENCES public.comments (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- 创建点赞表
CREATE TABLE IF NOT EXISTS public.likes (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
    target_type TEXT NOT NULL CHECK (
        target_type IN (
            'post',
            'comment',
            'inspiration'
        )
    ),
    target_id UUID NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (
            user_id,
            target_type,
            target_id
        )
);

-- 创建用户会话记录表
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
    session_type TEXT NOT NULL CHECK (
        session_type IN (
            'title_generator',
            'brand_namer',
            'slogan_generator',
            'creative_prompter',
            'ai_assistant',
            'image_prompt',
            'rewriter',
            'title_optimizer',
            'inspiration_map',
            'timeline'
        )
    ),
    session_data JSONB DEFAULT '{}',
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- 创建灵感时间线表
CREATE TABLE IF NOT EXISTS public.inspiration_timeline (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
    event_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- 启用所有表的 RLS
ALTER TABLE public.saved_inspirations ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.inspiration_maps ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.inspiration_timeline ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略

-- saved_inspirations 策略
CREATE POLICY "Users can view their own inspirations" ON public.saved_inspirations FOR
SELECT USING (auth.uid () = user_id);

CREATE POLICY "Users can view public inspirations" ON public.saved_inspirations FOR
SELECT USING (is_public = true);

CREATE POLICY "Users can insert their own inspirations" ON public.saved_inspirations FOR
INSERT
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "Users can update their own inspirations" ON public.saved_inspirations FOR
UPDATE USING (auth.uid () = user_id);

CREATE POLICY "Users can delete their own inspirations" ON public.saved_inspirations FOR DELETE USING (auth.uid () = user_id);

-- inspiration_maps 策略
CREATE POLICY "Users can view their own maps" ON public.inspiration_maps FOR
SELECT USING (auth.uid () = user_id);

CREATE POLICY "Users can view public maps" ON public.inspiration_maps FOR
SELECT USING (is_public = true);

CREATE POLICY "Users can insert their own maps" ON public.inspiration_maps FOR
INSERT
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "Users can update their own maps" ON public.inspiration_maps FOR
UPDATE USING (auth.uid () = user_id);

CREATE POLICY "Users can delete their own maps" ON public.inspiration_maps FOR DELETE USING (auth.uid () = user_id);

-- community_posts 策略
CREATE POLICY "Anyone can view published posts" ON public.community_posts FOR
SELECT USING (status = 'published');

CREATE POLICY "Users can view their own posts" ON public.community_posts FOR
SELECT USING (auth.uid () = user_id);

CREATE POLICY "Users can insert their own posts" ON public.community_posts FOR
INSERT
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "Users can update their own posts" ON public.community_posts FOR
UPDATE USING (auth.uid () = user_id);

CREATE POLICY "Users can delete their own posts" ON public.community_posts FOR DELETE USING (auth.uid () = user_id);

-- comments 策略
CREATE POLICY "Anyone can view comments" ON public.comments FOR
SELECT USING (true);

CREATE POLICY "Users can insert their own comments" ON public.comments FOR
INSERT
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "Users can update their own comments" ON public.comments FOR
UPDATE USING (auth.uid () = user_id);

CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid () = user_id);

-- likes 策略
CREATE POLICY "Anyone can view likes" ON public.likes FOR
SELECT USING (true);

CREATE POLICY "Users can insert their own likes" ON public.likes FOR
INSERT
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "Users can delete their own likes" ON public.likes FOR DELETE USING (auth.uid () = user_id);

-- user_sessions 策略
CREATE POLICY "Users can view their own sessions" ON public.user_sessions FOR
SELECT USING (auth.uid () = user_id);

CREATE POLICY "Users can insert their own sessions" ON public.user_sessions FOR
INSERT
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "Users can update their own sessions" ON public.user_sessions FOR
UPDATE USING (auth.uid () = user_id);

CREATE POLICY "Users can delete their own sessions" ON public.user_sessions FOR DELETE USING (auth.uid () = user_id);

-- inspiration_timeline 策略
CREATE POLICY "Users can view their own timeline" ON public.inspiration_timeline FOR
SELECT USING (auth.uid () = user_id);

CREATE POLICY "Users can insert their own timeline events" ON public.inspiration_timeline FOR
INSERT
WITH
    CHECK (auth.uid () = user_id);

CREATE POLICY "Users can update their own timeline events" ON public.inspiration_timeline FOR
UPDATE USING (auth.uid () = user_id);

CREATE POLICY "Users can delete their own timeline events" ON public.inspiration_timeline FOR DELETE USING (auth.uid () = user_id);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_saved_inspirations_user_id ON public.saved_inspirations (user_id);

CREATE INDEX IF NOT EXISTS idx_saved_inspirations_category ON public.saved_inspirations (category);

CREATE INDEX IF NOT EXISTS idx_saved_inspirations_tags ON public.saved_inspirations USING GIN (tags);

CREATE INDEX IF NOT EXISTS idx_inspiration_maps_user_id ON public.inspiration_maps (user_id);

CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON public.community_posts (user_id);

CREATE INDEX IF NOT EXISTS idx_community_posts_category ON public.community_posts (category);

CREATE INDEX IF NOT EXISTS idx_community_posts_status ON public.community_posts (status);

CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON public.community_posts (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_community_posts_tags ON public.community_posts USING GIN (tags);

CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments (post_id);

CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments (user_id);

CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments (parent_id);

CREATE INDEX IF NOT EXISTS idx_likes_target ON public.likes (target_type, target_id);

CREATE INDEX IF NOT EXISTS idx_likes_user_id ON public.likes (user_id);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions (user_id);

CREATE INDEX IF NOT EXISTS idx_user_sessions_type ON public.user_sessions (session_type);

CREATE INDEX IF NOT EXISTS idx_inspiration_timeline_user_id ON public.inspiration_timeline (user_id);

CREATE INDEX IF NOT EXISTS idx_inspiration_timeline_event_type ON public.inspiration_timeline (event_type);

CREATE INDEX IF NOT EXISTS idx_inspiration_timeline_created_at ON public.inspiration_timeline (created_at DESC);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为所有表添加更新时间触发器
CREATE TRIGGER handle_saved_inspirations_updated_at
  BEFORE UPDATE ON public.saved_inspirations
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_inspiration_maps_updated_at
  BEFORE UPDATE ON public.inspiration_maps
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_community_posts_updated_at
  BEFORE UPDATE ON public.community_posts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- 创建点赞计数更新函数
CREATE OR REPLACE FUNCTION public.update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.target_type = 'post' THEN
      UPDATE public.community_posts SET likes_count = likes_count + 1 WHERE id = NEW.target_id;
    ELSIF NEW.target_type = 'comment' THEN
      UPDATE public.comments SET likes_count = likes_count + 1 WHERE id = NEW.target_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.target_type = 'post' THEN
      UPDATE public.community_posts SET likes_count = likes_count - 1 WHERE id = OLD.target_id;
    ELSIF OLD.target_type = 'comment' THEN
      UPDATE public.comments SET likes_count = likes_count - 1 WHERE id = OLD.target_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 创建点赞计数触发器
CREATE TRIGGER handle_likes_count
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW EXECUTE PROCEDURE public.update_likes_count();

-- 创建评论计数更新函数
CREATE OR REPLACE FUNCTION public.update_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 创建评论计数触发器
CREATE TRIGGER handle_comments_count
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE PROCEDURE public.update_comments_count();