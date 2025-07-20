'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, User, Settings, LogOut, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // 如果未登录且加载完成，重定向到登录页面
        if (!loading && !user) {
            router.push('/auth/login')
        }
    }, [user, loading, router])

    const handleSignOut = async () => {
        await signOut()
        router.push('/')
    }

    // 显示加载状态
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">加载中...</p>
                </div>
            </div>
        )
    }

    // 如果未登录，不显示内容（会被重定向）
    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Lightbulb className="h-8 w-8 text-blue-600" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                IdeaBox
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-700">
                                    {user.email}
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSignOut}
                                className="flex items-center space-x-2"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>退出</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        欢迎回来，{user.user_metadata?.full_name || '用户'}！
                    </h1>
                    <p className="text-gray-600">
                        开始您的创意之旅，探索无限可能
                    </p>
                </div>

                {/* AI 工具卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Sparkles className="h-5 w-5 text-blue-600" />
                                <CardTitle>AI 创意生成</CardTitle>
                            </div>
                            <CardDescription>
                                使用 AI 生成创意想法和内容
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                让 AI 帮助您突破创意瓶颈，生成独特的想法和内容
                            </p>
                            <Button className="w-full" asChild>
                                <Link href="/ai/creative">
                                    开始创作
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Lightbulb className="h-5 w-5 text-green-600" />
                                <CardTitle>品牌命名</CardTitle>
                            </div>
                            <CardDescription>
                                为您的项目生成独特的品牌名称
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                基于您的项目描述，生成有创意的品牌名称和标语
                            </p>
                            <Button className="w-full" asChild>
                                <Link href="/ai/brand">
                                    生成名称
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Settings className="h-5 w-5 text-purple-600" />
                                <CardTitle>项目管理</CardTitle>
                            </div>
                            <CardDescription>
                                管理和组织您的创意项目
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                创建、编辑和管理您的创意项目，保持组织有序
                            </p>
                            <Button className="w-full" asChild>
                                <Link href="/projects">
                                    管理项目
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* 快速操作 */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">快速操作</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-12" asChild>
                            <Link href="/ai/generate">
                                开始 AI 对话
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-12" asChild>
                            <Link href="/projects/new">
                                创建新项目
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-12" asChild>
                            <Link href="/settings">
                                账户设置
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
} 