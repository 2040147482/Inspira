'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Lightbulb, Eye, EyeOff, Loader2, CheckCircle, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { PasswordStrength } from '@/components/ui/password-strength'
import { validatePassword } from '@/utils/password'
import { cn } from '@/lib/utils'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        agreeToTerms: false
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const { signUp } = useAuth()
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.fullName) {
            setError('请填写所有必填字段')
            return false
        }

        // 使用新的密码验证
        const passwordValidation = validatePassword(formData.password)
        if (!passwordValidation.isValid) {
            setError('密码不符合要求：' + passwordValidation.errors.join('，'))
            return false
        }

        if (formData.password !== formData.confirmPassword) {
            setError('两次输入的密码不匹配')
            return false
        }

        if (!formData.agreeToTerms) {
            setError('请同意服务条款和隐私政策')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setError('')

        try {
            const { data, error } = await signUp(
                formData.email,
                formData.password,
                {
                    full_name: formData.fullName,
                    subscription_tier: 'free'
                }
            )

            if (error) {
                setError(error.message)
            } else if (data?.user) {
                setSuccess(true)
                // 可以选择自动跳转或显示确认消息
                setTimeout(() => {
                    router.push('/auth/login?message=registration-success')
                }, 2000)
            }
        } catch (err) {
            setError('注册时发生错误，请重试')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-6">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">注册成功！</h2>
                        <p className="text-muted-foreground mb-4">
                            我们已向您的邮箱发送了确认邮件，请查收并验证您的账户。
                        </p>
                        <p className="text-sm text-muted-foreground">
                            正在跳转到登录页面...
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
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
                        创建您的账户，开启创意之旅
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>注册</CardTitle>
                        <CardDescription>
                            创建您的IdeaBox账户，解锁全部创意工具
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">姓名 *</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="输入您的姓名"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">邮箱 *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">密码 *</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="输入符合要求的密码"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                        minLength={8}
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

                                {/* 密码强度指示器 */}
                                {formData.password && (
                                    <PasswordStrength
                                        password={formData.password}
                                        className="mt-2"
                                    />
                                )}

                                {/* 密码要求提示 */}
                                <p className="text-xs text-muted-foreground mt-1">
                                    密码长度至少为8个字符，应至少包含以下各类字符中的一个：小写字母 (a-z)、大写字母 (A-Z)、数字 (0-9)、特殊字符 (!@#$%^&*()_+-=[]{ };\':"|&lt;&gt;?,./`~)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">确认密码 *</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="再次输入密码"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={loading}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>

                                {/* 密码匹配提示 */}
                                {formData.confirmPassword && (
                                    <div className="flex items-center space-x-2 mt-1">
                                        {formData.password === formData.confirmPassword ? (
                                            <CheckCircle className="h-3 w-3 text-green-500" />
                                        ) : (
                                            <X className="h-3 w-3 text-red-500" />
                                        )}
                                        <span className={cn(
                                            'text-xs',
                                            formData.password === formData.confirmPassword
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        )}>
                                            {formData.password === formData.confirmPassword
                                                ? '密码匹配'
                                                : '密码不匹配'
                                            }
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onCheckedChange={(checked) =>
                                        setFormData(prev => ({ ...prev, agreeToTerms: checked === true }))
                                    }
                                    disabled={loading}
                                />
                                <Label
                                    htmlFor="agreeToTerms"
                                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    我同意{' '}
                                    <Link href="/terms" className="text-blue-600 hover:underline">
                                        服务条款
                                    </Link>
                                    {' '}和{' '}
                                    <Link href="/privacy" className="text-blue-600 hover:underline">
                                        隐私政策
                                    </Link>
                                </Label>
                            </div>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        注册中...
                                    </>
                                ) : (
                                    '创建账户'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-sm text-center text-muted-foreground">
                            已有账户？{' '}
                            <Link
                                href="/auth/login"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                立即登录
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
} 