'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    isSupabaseConfigured: boolean
    signIn: (_email: string, _password: string) => Promise<{ data: any; error: AuthError | null }>
    signUp: (_email: string, _password: string, _userData?: any) => Promise<{ data: any; error: AuthError | null }>
    signOut: () => Promise<{ error: AuthError | null }>
    resetPassword: (_email: string) => Promise<{ data: any; error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // 如果 Supabase 未配置，跳过认证设置
        if (!isSupabaseConfigured) {
            setLoading(false)
            return
        }

        const supabase = createClient()

        // 如果 Supabase 客户端创建失败，跳过
        if (!supabase) {
            setLoading(false)
            return
        }

        // 获取初始会话
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // 监听认证状态变化
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('认证状态变化:', event, session?.user?.email)
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)

            // 只在这里处理自动重定向，登录页面的重定向由页面组件处理
            if (event === 'SIGNED_OUT') {
                router.push('/auth/login')
            }
        })

        return () => subscription?.unsubscribe()
    }, [router])

    const signIn = async (email: string, password: string) => {
        const supabase = createClient()
        if (!supabase) {
            return { data: null, error: { message: 'Supabase未配置' } as AuthError }
        }

        setLoading(true)

        try {
            console.log('正在尝试登录:', { email })

            const result = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            console.log('登录结果:', result)

            if (result.error) {
                console.error('登录错误:', result.error)
                // 提供更友好的错误信息
                let errorMessage = result.error.message
                if (result.error.message.includes('Invalid login credentials')) {
                    errorMessage = '邮箱或密码错误，请检查后重试'
                } else if (result.error.message.includes('Email not confirmed')) {
                    errorMessage = '请先验证您的邮箱'
                }
                result.error.message = errorMessage
            } else if (result.data?.user) {
                console.log('登录成功:', result.data.user)
            }

            setLoading(false)
            return result
        } catch (error) {
            console.error('登录异常:', error)
            setLoading(false)
            return {
                data: null,
                error: {
                    message: error instanceof Error ? error.message : '登录失败，请重试'
                } as AuthError
            }
        }
    }

    const signUp = async (email: string, password: string, userData: any = {}) => {
        const supabase = createClient()
        if (!supabase) {
            return { data: null, error: { message: 'Supabase未配置' } as AuthError }
        }

        setLoading(true)

        try {
            console.log('正在尝试注册:', { email, userData })

            const result = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData,
                },
            })

            console.log('注册结果:', result)

            if (result.error) {
                console.error('注册错误:', result.error)
            } else if (result.data?.user) {
                console.log('注册成功:', result.data.user)
            }

            setLoading(false)
            return result
        } catch (error) {
            console.error('注册异常:', error)
            setLoading(false)
            return {
                data: null,
                error: {
                    message: error instanceof Error ? error.message : '注册失败，请重试'
                } as AuthError
            }
        }
    }

    const signOut = async () => {
        const supabase = createClient()
        if (!supabase) {
            return { error: { message: 'Supabase未配置' } as AuthError }
        }

        setLoading(true)
        const result = await supabase.auth.signOut()
        setLoading(false)
        return result
    }

    const resetPassword = async (email: string) => {
        const supabase = createClient()
        if (!supabase) {
            return { data: null, error: { message: 'Supabase未配置' } as AuthError }
        }

        const result = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        })
        return result
    }

    const value = {
        user,
        session,
        loading,
        isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
        resetPassword,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 