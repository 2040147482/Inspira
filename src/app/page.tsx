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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              点燃创意火花，释放无限
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                灵感
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              为内容创作者、品牌从业者、营销人和自由撰稿人提供一站式创意生成工具
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="px-8">
                <Sparkles className="mr-2 h-5 w-5" />
                免费开始
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                查看演示
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50"></div>
        <div className="absolute top-40 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-50"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              强大的创意工具
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              从标题生成到品牌命名，从创意提示到内容改写，一站式解决你的创意需求
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wand2 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>爆款标题生成器</CardTitle>
                <CardDescription>
                  AI驱动的标题创作，让你的内容脱颖而出
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>品牌命名器</CardTitle>
                <CardDescription>
                  专业的品牌命名建议，助力品牌诞生
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>广告语生成器</CardTitle>
                <CardDescription>
                  创造吸引人的广告语，提升营销效果
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>AI 灵感助手</CardTitle>
                <CardDescription>
                  智能对话，随时为你提供创意指导
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">创意生成</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                5,000+
              </div>
              <div className="text-gray-600">用户</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">满意度</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">在线服务</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              为什么选择 IdeaBox
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们致力于为创作者提供最优质的创意生成服务
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">快速生成</h3>
              <p className="text-gray-600">
                先进的AI技术，秒级响应，快速生成高质量创意内容
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">精准匹配</h3>
              <p className="text-gray-600">
                基于行业特点和用户需求，提供个性化的创意解决方案
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">社区驱动</h3>
              <p className="text-gray-600">
                活跃的创作者社区，分享灵感，互相启发，共同成长
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            准备好释放你的创意潜能了吗？
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            加入数千名创作者的行列，让AI成为你的创意伙伴，开始你的创意之旅
          </p>
          <Button size="lg" variant="secondary" className="px-8">
            <TrendingUp className="mr-2 h-5 w-5" />
            立即开始创作
          </Button>
        </div>
      </section>
    </div>
  );
}
