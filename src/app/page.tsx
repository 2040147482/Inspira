import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Lightbulb,
  Sparkles,
  Wand2,
  MessageSquare,
  Zap,
  Target,
  Users,
  TrendingUp,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
              点燃创意火花，释放无限
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                灵感
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4 max-w-2xl mx-auto">
              为内容创作者、品牌从业者、营销人和自由撰稿人提供一站式创意生成工具
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button size="lg" className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                免费开始
              </Button>
              <Button variant="outline" size="lg" className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                查看演示
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-4 md:left-10 w-16 h-16 md:w-20 md:h-20 bg-blue-200 rounded-full opacity-50"></div>
        <div className="absolute top-32 md:top-40 right-4 md:right-10 w-12 h-12 md:w-16 md:h-16 bg-purple-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 bg-green-200 rounded-full opacity-30"></div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              强大的创意工具集
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              专为创作者设计的智能化工具，让创意变得简单高效
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">爆款标题生成器</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  一键生成吸引人的标题，提升内容点击率
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wand2 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">品牌命名器</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  智能生成独特的品牌名称和商标建议
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">文案创作助手</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  AI 驱动的文案生成，适配各种场景需求
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">AI 灵感助手</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  智能对话，随时为你提供创意指导
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                10,000+
              </div>
              <div className="text-sm md:text-base text-gray-600">创意生成</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">
                5,000+
              </div>
              <div className="text-sm md:text-base text-gray-600">用户</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-sm md:text-base text-gray-600">满意度</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <div className="text-sm md:text-base text-gray-600">在线服务</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              为什么选择 IdeaBox
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              我们致力于为每一位创作者提供最好的创意工具和服务
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">极速生成</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  借助先进的 AI 技术，在几秒钟内生成高质量的创意内容，大幅提升工作效率。
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">精准定位</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  根据你的行业、目标受众和品牌调性，生成最符合需求的创意内容。
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">团队协作</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  支持多人协作编辑，实时同步创意内容，让团队创作更加高效便捷。
                </CardDescription>
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
              开启你的创意之旅
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 px-4">
              立即注册，体验 AI 驱动的创意生成工具
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button size="lg" variant="secondary" className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                免费开始使用
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
              >
                了解更多功能
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
