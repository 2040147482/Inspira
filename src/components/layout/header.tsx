'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Lightbulb,
  ChevronDown,
  Globe,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Heart,
  Zap,
  Palette,
  Megaphone,
  Shuffle,
  Star,
  Users,
  MessageCircle,
  Image,
  Target,
  Book,
  FileText,
  Compass,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// 自定义用户图标组件
const UserIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 1024 1024"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M959.68 921.024c-15.232-181.696-139.648-331.968-307.84-386.624 70.464-45.632 117.248-124.48 117.248-214.464C769.152 178.624 654.208 64 512.512 64 370.752 64 255.808 178.624 255.808 319.936c0 89.984 46.784 168.832 117.248 214.528-168.192 54.592-292.544 204.864-307.84 386.56-0.192 3.456-0.64 5.44 0 10.176C66.496 947.2 80.64 960 96.704 960c17.92 0 32.064-14.656 32.064-32 16.704-197.76 182.272-351.936 383.744-351.936 201.408 0 366.976 154.176 383.68 351.936 0 17.344 14.144 32 32.064 32 16.064 0 30.208-12.8 31.424-28.8C960.32 926.464 959.936 924.416 959.68 921.024zM320 319.936C320 213.952 406.208 128 512.512 128s192.448 85.952 192.448 191.936c0 106.048-86.144 192-192.448 192S320 425.984 320 319.936z"
      fill="currentColor"
    />
  </svg>
);

export function Header() {
  const { user, loading, isSupabaseConfigured, signOut } = useAuth();
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [showUserNotification, setShowUserNotification] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const handleSignOut = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const { error } = await signOut();
      if (error) {
        console.error('登出失败:', error.message);
      }
    } catch (error) {
      console.error('登出异常:', error);
    }
  };

  const handleLoginClick = () => {
    // 跳转到登录页面
    window.location.href = '/auth/login';
  };

  // 当用户登录时显示通知
  useEffect(() => {
    if (user && !loading) {
      setShowUserNotification(true);
      const timer = setTimeout(() => setShowUserNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  // 用户菜单渲染逻辑
  const renderUserSection = () => {
    if (loading) {
      return (
        <Button variant="ghost" size="sm" disabled>
          <UserIcon className="h-4 w-4 animate-pulse" />
        </Button>
      );
    }

    if (!isSupabaseConfigured) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-xs text-orange-500">Demo模式</span>
          <Button variant="ghost" size="sm" disabled>
            <UserIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
                <AvatarFallback>
                  <UserIcon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.user_metadata?.full_name || user.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>我的空间</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4" />
              <span>我的灵感</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>设置</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>登出</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login">
          <Button variant="ghost" size="sm">
            登录
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button size="sm">
            注册
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: '#fcfcfc' }}
    >
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-8 flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Lightbulb className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            IdeaBox
          </span>
        </Link>

        {/* Main Navigation */}
        <nav className="flex items-center space-x-1">
          {/* 产品 Product */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                产品
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[720px] p-4" align="start">
              <div className="grid grid-cols-3 gap-6">
                {/* 灵感启蒙分类 */}
                <div className="space-y-1">
                  <DropdownMenuLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    灵感启蒙 Inspiration Starter
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    <div>
                      <div className="font-medium">爆款标题生成器</div>
                      <div className="text-xs text-muted-foreground">
                        Title Generator
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Palette className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="font-medium">品牌命名器</div>
                      <div className="text-xs text-muted-foreground">
                        Brand Name Generator
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Megaphone className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="font-medium">广告语生成器</div>
                      <div className="text-xs text-muted-foreground">
                        Slogan Generator
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Shuffle className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-medium">随机灵感骰子</div>
                      <div className="text-xs text-muted-foreground">
                        Random Idea Prompt
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <div>
                      <div className="font-medium">最近收藏</div>
                      <div className="text-xs text-muted-foreground">
                        Inspiration Library 快捷入口
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>

                {/* 灵感共创分类 */}
                <div className="space-y-1">
                  <DropdownMenuLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    灵感共创 Inspiration Community
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Users className="h-4 w-4 text-indigo-500" />
                    <div>
                      <div className="font-medium">灵感市集</div>
                      <div className="text-xs text-muted-foreground">
                        Idea Plaza
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <MessageCircle className="h-4 w-4 text-cyan-500" />
                    <div>
                      <div className="font-medium">AI 写作辅导师</div>
                      <div className="text-xs text-muted-foreground">
                        AI Copywriter
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Image className="h-4 w-4 text-pink-500" />
                    <div>
                      <div className="font-medium">AI 绘图 Prompt 生成器</div>
                      <div className="text-xs text-muted-foreground">
                        Image Prompt Generator
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Target className="h-4 w-4 text-red-500" />
                    <div>
                      <div className="font-medium">标题优化 & A/B 测试器</div>
                      <div className="text-xs text-muted-foreground">
                        Title Optimizer
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>

                {/* 灵感管理分类 */}
                <div className="space-y-1">
                  <DropdownMenuLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    灵感管理 Inspiration Manager
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Book className="h-4 w-4 text-emerald-500" />
                    <div>
                      <div className="font-medium">灵感收藏夹</div>
                      <div className="text-xs text-muted-foreground">
                        Inspiration Library
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <Compass className="h-4 w-4 text-violet-500" />
                    <div>
                      <div className="font-medium">灵感脑图</div>
                      <div className="text-xs text-muted-foreground">
                        Inspiration Mindmap
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-2">
                    <FileText className="h-4 w-4 text-amber-500" />
                    <div>
                      <div className="font-medium">创意日记</div>
                      <div className="text-xs text-muted-foreground">
                        Inspiration Timeline & Diary
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 解决方案 Solutions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                解决方案
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem className="p-3">
                <div>
                  <div className="font-medium">自媒体创作者</div>
                  <div className="text-xs text-muted-foreground">
                    内容创作与标题优化
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div>
                  <div className="font-medium">品牌运营方</div>
                  <div className="text-xs text-muted-foreground">
                    品牌命名与营销文案
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div>
                  <div className="font-medium">视频内容制作人</div>
                  <div className="text-xs text-muted-foreground">
                    视频标题与脚本灵感
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div>
                  <div className="font-medium">海外社媒管理团队</div>
                  <div className="text-xs text-muted-foreground">
                    多语言内容策划
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 定价 */}
          <Button
            variant="ghost"
            className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href="/pricing">定价</a>
          </Button>

          {/* 博客 */}
          <Button
            variant="ghost"
            className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href="/blog">博客</a>
          </Button>

          {/* 灵感市集 */}
          <Button
            variant="ghost"
            className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href="/community">灵感市集</a>
          </Button>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* 语言切换 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Globe className="mr-1 h-4 w-4" />
                {language === 'zh' ? '中' : 'EN'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setLanguage('zh')}
                className={cn(language === 'zh' && 'bg-accent')}
              >
                中文
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('en')}
                className={cn(language === 'en' && 'bg-accent')}
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 用户操作 */}
          {renderUserSection()}
        </div>
      </div>
    </header>
  );
}
 