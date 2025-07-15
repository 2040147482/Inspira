'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Check,
    X,
    Sparkles,
    Zap,
    Crown,
    Star,
    Users,
    Clock,
    Shield,
    Headphones,
} from 'lucide-react';

export default function PricingPage() {
    const plans = [
        {
            name: '免费版',
            nameEn: 'Free',
            price: '¥0',
            period: '永久免费',
            description: '适合个人用户和初学者',
            badge: null,
            features: [
                { name: '每日生成次数', limit: '20 次', included: true },
                { name: '基础创意工具', limit: '5 个工具', included: true },
                { name: '爆款标题生成器', limit: '基础版', included: true },
                { name: '品牌命名器', limit: '基础版', included: true },
                { name: '灵感收藏夹', limit: '最多 50 个', included: true },
                { name: '导出功能', limit: 'PDF 导出', included: true },
                { name: 'AI 写作助手', limit: '不包含', included: false },
                { name: '高级分析功能', limit: '不包含', included: false },
                { name: '团队协作', limit: '不包含', included: false },
                { name: '优先客服支持', limit: '不包含', included: false },
                { name: '自定义模板', limit: '不包含', included: false },
            ],
            buttonText: '立即开始',
            buttonVariant: 'outline' as const,
            popular: false,
        },
        {
            name: '专业版',
            nameEn: 'Pro',
            price: '¥99',
            period: '每月',
            description: '适合专业创作者和小团队',
            badge: '最受欢迎',
            features: [
                { name: '每日生成次数', limit: '无限制', included: true },
                { name: '全部创意工具', limit: '15+ 个工具', included: true },
                { name: '爆款标题生成器', limit: '专业版', included: true },
                { name: '品牌命名器', limit: '专业版', included: true },
                { name: '灵感收藏夹', limit: '无限制', included: true },
                { name: '导出功能', limit: '全格式导出', included: true },
                { name: 'AI 写作助手', limit: '完整版', included: true },
                { name: '高级分析功能', limit: '包含', included: true },
                { name: '团队协作', limit: '最多 5 人', included: true },
                { name: '优先客服支持', limit: '24/7 支持', included: true },
                { name: '自定义模板', limit: '无限制', included: true },
            ],
            buttonText: '开始专业创作',
            buttonVariant: 'default' as const,
            popular: true,
        },
    ];

    const enterpriseFeatures = [
        {
            icon: <Users className="h-6 w-6 text-purple-600" />,
            title: '无限团队成员',
            description: '支持大型团队协作，统一管理权限和资源',
        },
        {
            icon: <Shield className="h-6 w-6 text-purple-600" />,
            title: '企业级安全',
            description: 'SOC2 认证，数据加密，私有云部署',
        },
        {
            icon: <Headphones className="h-6 w-6 text-purple-600" />,
            title: '专属客服经理',
            description: '7×24小时专属客服，1对1技术支持',
        },
        {
            icon: <Zap className="h-6 w-6 text-purple-600" />,
            title: 'API 集成',
            description: '开放API接口，与企业现有系统无缝集成',
        },
    ];

    const handleGetStarted = (planName: string) => {
        if (planName === '免费版') {
            // 跳转到注册页面
            window.location.href = '/auth/register';
        } else {
            // 跳转到订阅页面
            window.location.href = '/subscription';
        }
    };

    const handleContactSales = () => {
        // 跳转到联系我们页面或打开客服
        window.location.href = '/contact';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Section */}
            <section className="pt-16 pb-12 md:pt-24 md:pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge variant="outline" className="mb-4 md:mb-6">
                            <Star className="mr-1 h-3 w-3" />
                            灵活定价
                        </Badge>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                            选择适合您的
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                创作计划
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
                            从免费版本开始，随时升级到专业版解锁更多强大功能
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-12 md:pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular
                                        ? 'border-purple-200 shadow-lg ring-2 ring-purple-100'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-2 text-sm font-medium">
                                        <Sparkles className="inline mr-1 h-4 w-4" />
                                        {plan.badge}
                                    </div>
                                )}

                                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                                    <div className="space-y-2">
                                        <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
                                        <div className="flex items-baseline justify-center space-x-2">
                                            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                                                {plan.price}
                                            </span>
                                            {plan.price !== '¥0' && (
                                                <span className="text-base md:text-lg text-gray-500">/{plan.period}</span>
                                            )}
                                        </div>
                                        {plan.price === '¥0' && (
                                            <span className="text-base md:text-lg text-gray-500">{plan.period}</span>
                                        )}
                                    </div>
                                    <CardDescription className="text-base md:text-lg pt-2">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="px-4 md:px-6">
                                    {plan.features.map((feature, featureIndex) => (
                                        <div
                                            key={featureIndex}
                                            className="flex items-start justify-between py-2 md:py-3 border-b border-gray-100 last:border-b-0"
                                        >
                                            <div className="flex items-start space-x-3">
                                                {feature.included ? (
                                                    <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                ) : (
                                                    <X className="h-4 w-4 md:h-5 md:w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                                                )}
                                                <span
                                                    className={`text-sm md:text-base font-medium ${feature.included ? 'text-gray-900' : 'text-gray-400'
                                                        }`}
                                                >
                                                    {feature.name}
                                                </span>
                                            </div>
                                            <span
                                                className={`text-xs md:text-sm ml-2 flex-shrink-0 ${feature.included ? 'text-gray-600' : 'text-gray-400'
                                                    }`}
                                            >
                                                {feature.limit}
                                            </span>
                                        </div>
                                    ))}
                                </CardContent>

                                <CardFooter className="pt-6 px-4 md:px-6">
                                    <Button
                                        variant={plan.buttonVariant}
                                        className="w-full py-3 md:py-4 text-base md:text-lg"
                                        size="lg"
                                        onClick={() => handleGetStarted(plan.name)}
                                    >
                                        {plan.popular && <Sparkles className="mr-2 h-4 w-4" />}
                                        {plan.buttonText}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enterprise Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <Badge variant="outline" className="mb-4">
                            <Crown className="mr-1 h-3 w-3" />
                            企业方案
                        </Badge>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            为企业打造的专业解决方案
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                            需要更多功能？我们为企业客户提供定制化解决方案，包含高级功能和专属支持。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
                        {enterpriseFeatures.map((feature, index) => (
                            <Card key={index} className="text-center border-gray-100 hover:shadow-md transition-shadow">
                                <CardHeader className="pb-4">
                                    <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-base md:text-lg">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button
                            size="lg"
                            className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                            onClick={handleContactSales}
                        >
                            <Users className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            联系销售团队
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            常见问题
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                            关于定价和功能的常见问题解答
                        </p>
                    </div>

                    <div className="grid gap-6 md:gap-8 max-w-4xl mx-auto">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-xl">
                                    免费版有使用时间限制吗？
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm md:text-base">
                                    免费版没有时间限制，您可以永久免费使用基础功能。只是每日生成次数有限制，升级到专业版可获得无限制使用。
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-xl">
                                    可以随时取消订阅吗？
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm md:text-base">
                                    是的，您可以随时取消订阅。取消后您仍可以使用到当前付费周期结束，之后账户会自动降级到免费版。
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-xl">
                                    可以升级或降级套餐吗？
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm md:text-base">
                                    是的，您可以随时升级到专业版或从专业版降级到免费版。升级立即生效，降级在当前付费周期结束后生效。
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-xl">
                                    支持哪些付款方式？
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm md:text-base">
                                    我们支持支付宝、微信支付、银行卡支付等多种付款方式。企业用户还可以选择银行转账和开具发票。
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-xl">
                                    有学生优惠吗？
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm md:text-base">
                                    我们为在校学生提供 50% 的教育优惠。请联系客服并提供学生证明材料获取优惠码。
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                            准备好开启创意之旅了吗？
                        </h2>
                        <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 px-4">
                            加入已有超过 10,000+ 创作者使用 IdeaBox 提升创作效率
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto"
                                onClick={() => handleGetStarted('免费版')}
                            >
                                <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                                免费开始创作
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
                                onClick={() => window.location.href = '/demo'}
                            >
                                查看功能演示
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 