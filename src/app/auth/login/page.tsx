'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lightbulb, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { signIn, user, loading: authLoading } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()

    // 检查 URL 参数中的消息
    useEffect(() => {
        const message = searchParams.get('message')
        if (message === 'registration-success') {
            setSuccess('注册成功！请使用您的邮箱和密码登录。')
        }
    }, [searchParams])

    // 如果用户已登录，自动跳转到首页
    useEffect(() => {
        if (!authLoading && user) {
            router.push('/')
        }
    }, [user, authLoading, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const { data, error } = await signIn(email, password)

            if (error) {
                setError(error.message)
            } else if (data?.user) {
                setSuccess('登录成功！正在跳转...')
                // 使用更短的延迟，并确保跳转
                setTimeout(() => {
                    router.push('/')
                }, 500)
            }
        } catch (err) {
            setError('登录时发生错误，请重试')
        } finally {
            setLoading(false)
        }
    }

    // 如果正在加载认证状态，显示加载界面
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">检查登录状态...</p>
                </div>
            </div>
        )
    }

    // 如果用户已登录，不显示登录表单
    if (user) {
        return null
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2">
                        <Lightbulb className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            IdeaBox
                        </span>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-2">
                        登录您的账户，开始创意之旅
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>登录</CardTitle>
                        <CardDescription>
                            使用您的邮箱和密码登录账户
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">邮箱</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">密码</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="输入您的密码"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {success && (
                                <Alert className="border-green-200 text-green-800 bg-green-50">
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertDescription>{success}</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading || !email || !password}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        登录中...
                                    </>
                                ) : (
                                    '登录'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-sm text-center">
                            <Link
                                href="/auth/forgot-password"
                                className="text-blue-600 hover:underline"
                            >
                                忘记密码？
                            </Link>
                        </div>
                        <div className="text-sm text-center text-muted-foreground">
                            还没有账户？{' '}
                            <Link
                                href="/auth/register"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                立即注册
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
} 