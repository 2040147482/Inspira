import { Lightbulb, Github, Twitter, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 md:py-12 px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold">IdeaBox</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              为内容创作者、品牌从业者、营销人和自由撰稿人提供一站式创意生成工具
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@ideabox.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">创意工具</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/tools/title-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  爆款标题生成器
                </a>
              </li>
              <li>
                <a href="/tools/brand-naming" className="text-muted-foreground hover:text-foreground transition-colors">
                  品牌命名器
                </a>
              </li>
              <li>
                <a
                  href="/tools/slogan-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  广告语生成器
                </a>
              </li>
              <li>
                <a
                  href="/tools/random-prompt"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  随机创意提示器
                </a>
              </li>
              <li>
                <a
                  href="/tools/ai-writer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI 写作助手
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">资源</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  博客
                </a>
              </li>
              <li>
                <a href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                  灵感市集
                </a>
              </li>
              <li>
                <a href="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                  使用指南
                </a>
              </li>
              <li>
                <a href="/tutorials" className="text-muted-foreground hover:text-foreground transition-colors">
                  视频教程
                </a>
              </li>
              <li>
                <a href="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                  案例展示
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">公司</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  关于我们
                </a>
              </li>
              <li>
                <a href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  加入我们
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  联系我们
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  服务条款
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between space-y-4 text-center sm:flex-row sm:space-y-0 sm:text-left">
          <div className="text-sm text-muted-foreground">
            © 2024 IdeaBox. 保留所有权利.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-end">
            <a href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              定价
            </a>
            <a href="/api-docs" className="text-muted-foreground hover:text-foreground transition-colors">
              API 文档
            </a>
            <a href="/status" className="text-muted-foreground hover:text-foreground transition-colors">
              服务状态
            </a>
            <a href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
              更新日志
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
