import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

// 环境变量检查，提供默认值以支持构建
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// 检查是否为真实的配置
const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')
)

if (!isConfigured) {
    console.warn('⚠️ Supabase环境变量未配置，认证功能将不可用')
    console.warn('请在Vercel中配置以下环境变量:')
    console.warn('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
} else {
    console.log('✅ Supabase配置已找到')
    console.log('URL:', supabaseUrl)
    console.log('Key开头:', supabaseAnonKey.substring(0, 20) + '...')
}

// 单例 Supabase 客户端实例
let supabaseClient: SupabaseClient<Database> | null = null

// 客户端组件使用的Supabase客户端
export function createClient(): SupabaseClient<Database> | null {
    // 如果环境变量未配置，返回null而不是抛出错误
    if (!isConfigured) {
        return null
    }

    // 如果已经创建过客户端，直接返回
    if (supabaseClient) {
        return supabaseClient
    }

    try {
        supabaseClient = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        })
        console.log('✅ Supabase客户端创建成功')
        return supabaseClient
    } catch (error) {
        console.error('❌ Supabase客户端创建失败:', error)
        return null
    }
}

// 导出配置状态
export const isSupabaseConfigured = isConfigured

// 完整的数据库类型定义
export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    bio: string | null
                    website: string | null
                    location: string | null
                    subscription_tier: 'free' | 'pro' | 'enterprise'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    website?: string | null
                    location?: string | null
                    subscription_tier?: 'free' | 'pro' | 'enterprise'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    website?: string | null
                    location?: string | null
                    subscription_tier?: 'free' | 'pro' | 'enterprise'
                    created_at?: string
                    updated_at?: string
                }
            }
            saved_inspirations: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    content: string
                    category: string
                    tags: string[] | null
                    is_public: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    content: string
                    category: string
                    tags?: string[] | null
                    is_public?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    content?: string
                    category?: string
                    tags?: string[] | null
                    is_public?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            inspiration_maps: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    nodes: any
                    edges: any
                    is_public: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description?: string | null
                    nodes?: any
                    edges?: any
                    is_public?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    description?: string | null
                    nodes?: any
                    edges?: any
                    is_public?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            community_posts: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    content: string
                    category: string
                    tags: string[] | null
                    likes_count: number
                    comments_count: number
                    views_count: number
                    is_featured: boolean
                    status: 'draft' | 'published' | 'archived'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    content: string
                    category: string
                    tags?: string[] | null
                    likes_count?: number
                    comments_count?: number
                    views_count?: number
                    is_featured?: boolean
                    status?: 'draft' | 'published' | 'archived'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    content?: string
                    category?: string
                    tags?: string[] | null
                    likes_count?: number
                    comments_count?: number
                    views_count?: number
                    is_featured?: boolean
                    status?: 'draft' | 'published' | 'archived'
                    created_at?: string
                    updated_at?: string
                }
            }
            comments: {
                Row: {
                    id: string
                    user_id: string
                    post_id: string
                    parent_id: string | null
                    content: string
                    likes_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    post_id: string
                    parent_id?: string | null
                    content: string
                    likes_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    post_id?: string
                    parent_id?: string | null
                    content?: string
                    likes_count?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            likes: {
                Row: {
                    id: string
                    user_id: string
                    target_type: 'post' | 'comment' | 'inspiration'
                    target_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    target_type: 'post' | 'comment' | 'inspiration'
                    target_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    target_type?: 'post' | 'comment' | 'inspiration'
                    target_id?: string
                    created_at?: string
                }
            }
            user_sessions: {
                Row: {
                    id: string
                    user_id: string
                    session_type: 'title_generator' | 'brand_namer' | 'slogan_generator' | 'creative_prompter' | 'ai_assistant' | 'image_prompt' | 'rewriter' | 'title_optimizer' | 'inspiration_map' | 'timeline'
                    session_data: any
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    session_type: 'title_generator' | 'brand_namer' | 'slogan_generator' | 'creative_prompter' | 'ai_assistant' | 'image_prompt' | 'rewriter' | 'title_optimizer' | 'inspiration_map' | 'timeline'
                    session_data?: any
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    session_type?: 'title_generator' | 'brand_namer' | 'slogan_generator' | 'creative_prompter' | 'ai_assistant' | 'image_prompt' | 'rewriter' | 'title_optimizer' | 'inspiration_map' | 'timeline'
                    session_data?: any
                    created_at?: string
                }
            }
            inspiration_timeline: {
                Row: {
                    id: string
                    user_id: string
                    event_type: string
                    title: string
                    description: string | null
                    metadata: any
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    event_type: string
                    title: string
                    description?: string | null
                    metadata?: any
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    event_type?: string
                    title?: string
                    description?: string | null
                    metadata?: any
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// 导出常用的类型别名
export type Profile = Database['public']['Tables']['profiles']['Row']
export type SavedInspiration = Database['public']['Tables']['saved_inspirations']['Row']
export type InspirationMap = Database['public']['Tables']['inspiration_maps']['Row']
export type CommunityPost = Database['public']['Tables']['community_posts']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']
export type Like = Database['public']['Tables']['likes']['Row']
export type UserSession = Database['public']['Tables']['user_sessions']['Row']
export type InspirationTimeline = Database['public']['Tables']['inspiration_timeline']['Row'] 