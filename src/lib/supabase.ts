import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// 环境变量检查
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase环境变量未配置，认证功能将不可用')
    console.warn('请在.env.local文件中配置以下变量:')
    console.warn('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
} else {
    console.log('✅ Supabase配置已找到')
    console.log('URL:', supabaseUrl)
    console.log('Key开头:', supabaseAnonKey.substring(0, 20) + '...')
}

// 客户端组件使用的Supabase客户端
export function createClient() {
    // 如果环境变量未配置，返回null而不是抛出错误
    if (!supabaseUrl || !supabaseAnonKey) {
        return null
    }

    try {
        const client = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        })
        console.log('✅ Supabase客户端创建成功')
        return client
    } catch (error) {
        console.error('❌ Supabase客户端创建失败:', error)
        return null
    }
}

// 数据库类型定义
export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    subscription_tier: 'free' | 'pro' | 'enterprise'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    subscription_tier?: 'free' | 'pro' | 'enterprise'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
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
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
} 