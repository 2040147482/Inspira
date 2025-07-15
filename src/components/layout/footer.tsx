import { Lightbulb, Github, Twitter, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold">IdeaBox</span>
            </div>
            <p className="text-sm text-muted-foreground">
              为内容创作者、品牌从业者、营销人和自由撰稿人提供一站式创意生成工具
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">创意工具</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="/tools/title-generator"
                  className="hover:text-foreground"
                >
                  爆款标题生成器
                </a>
              </li>
              <li>
                <a href="/tools/brand-naming" className="hover:text-foreground">
                  品牌命名器
                </a>
              </li>
              <li>
                <a
                  href="/tools/slogan-generator"
                  className="hover:text-foreground"
                >
                  广告语生成器
                </a>
              </li>
              <li>
                <a
                  href="/tools/random-prompt"
                  className="hover:text-foreground"
                >
                  随机创意提示器
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">社区</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/community" className="hover:text-foreground">
                  灵感广场
                </a>
              </li>
              <li>
                <a href="/favorites" className="hover:text-foreground">
                  我的收藏
                </a>
              </li>
              <li>
                <a href="/community/trending" className="hover:text-foreground">
                  热门创意
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">支持</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/help" className="hover:text-foreground">
                  帮助中心
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-foreground">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-foreground">
                  服务条款
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-foreground">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 IdeaBox. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
