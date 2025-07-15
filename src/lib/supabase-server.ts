import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './supabase'

// 服务端组件使用的Supabase客户端
export function createServerSupabaseClient() {
    const cookieStore = cookies()

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: any) {
                    cookieStore.set({ name, value, ...options })
                },
                remove(name: string, options: any) {
                    cookieStore.set({ name, value: '', ...options })
                },
            },
        }
    )
}

// 中间件用的Supabase客户端
export function createMiddlewareSupabaseClient(request: Request) {
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    const cookie = request.headers.get('cookie')
                    if (!cookie) return undefined
                    const match = cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
                    return match ? match[2] : undefined
                },
                set() {
                    // 在中间件中不能设置cookies
                },
                remove() {
                    // 在中间件中不能删除cookies
                },
            },
        }
    )
} 