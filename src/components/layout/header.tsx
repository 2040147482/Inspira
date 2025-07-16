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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
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
  Users,
  MessageCircle,
  Image,
  Target,
  Book,
  FileText,
  Compass,
  Menu,
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
      d="M512 512a128 128 0 1 0 0-256 128 128 0 0 0 0 256zm0 64c-84.352 0-256 42.688-256 128v64h512v-64c0-85.312-171.648-128-256-128z"
      fill="currentColor"
    />
  </svg>
);

export default function Header() {
  const [language, setLanguage] = useState('zh');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toolsData = {
    inspiration: [
      {
        icon: <Zap className="h-4 w-4 text-orange-500" />,
        name: '爆款标题生成器',
        description: 'Title Generator',
        href: '/tools/title-generator',
      },
      {
        icon: <Palette className="h-4 w-4 text-purple-500" />,
        name: '品牌命名器',
        description: 'Brand Name Generator',
        href: '/tools/brand-name',
      },
      {
        icon: <Megaphone className="h-4 w-4 text-green-500" />,
        name: '广告语生成器',
        description: 'Slogan Generator',
        href: '/tools/slogan',
      },
      {
        icon: <Shuffle className="h-4 w-4 text-blue-500" />,
        name: '随机灵感骰子',
        description: 'Random Idea Prompt',
        href: '/tools/random-idea',
      },
    ],
    community: [
      {
        icon: <Users className="h-4 w-4 text-indigo-500" />,
        name: '灵感市集',
        description: 'Idea Plaza',
        href: '/community',
      },
      {
        icon: <MessageCircle className="h-4 w-4 text-cyan-500" />,
        name: 'AI 写作辅导师',
        description: 'AI Copywriter',
        href: '/tools/ai-writer',
      },
      {
        icon: <Image className="h-4 w-4 text-pink-500" />,
        name: 'AI 绘图 Prompt 生成器',
        description: 'Image Prompt Generator',
        href: '/tools/image-prompt',
      },
    ],
    management: [
      {
        icon: <Book className="h-4 w-4 text-amber-500" />,
        name: '灵感收藏夹',
        description: 'Inspiration Library',
        href: '/library',
      },
      {
        icon: <FileText className="h-4 w-4 text-emerald-500" />,
        name: '内容管理器',
        description: 'Content Manager',
        href: '/content',
      },
      {
        icon: <Compass className="h-4 w-4 text-teal-500" />,
        name: '创作导航',
        description: 'Creation Guide',
        href: '/guide',
      },
    ],
  };

  const renderUserSection = () => {
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.user_metadata?.avatar_url}
                  alt={user.email || '用户'}
                />
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
                  {user.user_metadata?.full_name || '用户'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                工作台
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/favorites" className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                收藏夹
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                设置
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium"
          asChild
        >
          <Link href="/auth/login">登录</Link>
        </Button>
        <Button
          size="sm"
          className="text-sm font-medium"
          asChild
        >
          <Link href="/auth/register">注册</Link>
        </Button>
      </div>
    );
  };

  const MobileNavigation = () => {
    return (
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="p-4">
            <SheetTitle className="text-lg font-semibold">
              菜单
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4 p-4">
            <Link href="/" className="text-lg font-semibold">
              <Lightbulb className="mr-2 h-5 w-5" />
              首页
            </Link>
            <Link href="/tools" className="text-lg font-semibold">
              <Zap className="mr-2 h-5 w-5" />
              创意工具
            </Link>
            <Link href="/industries" className="text-lg font-semibold">
              <Globe className="mr-2 h-5 w-5" />
              行业应用
            </Link>
            <Link href="/pricing" className="text-lg font-semibold">
              <Target className="mr-2 h-5 w-5" />
              定价
            </Link>
            <Link href="/blog" className="text-lg font-semibold">
              <Book className="mr-2 h-5 w-5" />
              博客
            </Link>
            <Link href="/community" className="text-lg font-semibold">
              <Users className="mr-2 h-5 w-5" />
              灵感市集
            </Link>
            <Link href="/dashboard" className="text-lg font-semibold">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              工作台
            </Link>
            <Link href="/favorites" className="text-lg font-semibold">
              <Heart className="mr-2 h-5 w-5" />
              收藏夹
            </Link>
            <Link href="/settings" className="text-lg font-semibold">
              <Settings className="mr-2 h-5 w-5" />
              设置
            </Link>
            <Link href="/auth/login" className="text-lg font-semibold">
              <User className="mr-2 h-5 w-5" />
              登录
            </Link>
            <Link href="/auth/register" className="text-lg font-semibold">
              <User className="mr-2 h-5 w-5" />
              注册
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200',
        isScrolled && 'shadow-sm'
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <MobileNavigation />
          <Link href="/" className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">IdeaBox</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-8 space-x-6">
          {/* 创意工具下拉菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                创意工具
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[600px] p-4" align="start">
              <div className="grid grid-cols-2 gap-6">
                {/* 灵感启蒙分类 */}
                <div className="space-y-1">
                  <DropdownMenuLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    灵感启蒙
                  </DropdownMenuLabel>
                  {toolsData.inspiration.map((tool, index) => (
                    <DropdownMenuItem key={index} className="flex items-center gap-3 p-2" asChild>
                      <Link href={tool.href}>
                        {tool.icon}
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {tool.description}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>

                {/* 灵感共创分类 */}
                <div className="space-y-1">
                  <DropdownMenuLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    灵感共创
                  </DropdownMenuLabel>
                  {toolsData.community.map((tool, index) => (
                    <DropdownMenuItem key={index} className="flex items-center gap-3 p-2" asChild>
                      <Link href={tool.href}>
                        {tool.icon}
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {tool.description}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 行业应用下拉菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                行业应用
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="start">
              <DropdownMenuItem className="p-3" asChild>
                <Link href="/industries/content-creator">
                  <div>
                    <div className="font-medium">自媒体创作者</div>
                    <div className="text-xs text-muted-foreground">
                      内容创作与标题优化
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3" asChild>
                <Link href="/industries/brand-operation">
                  <div>
                    <div className="font-medium">品牌运营方</div>
                    <div className="text-xs text-muted-foreground">
                      品牌命名与营销文案
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3" asChild>
                <Link href="/industries/video-creator">
                  <div>
                    <div className="font-medium">视频内容制作人</div>
                    <div className="text-xs text-muted-foreground">
                      视频标题与脚本灵感
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3" asChild>
                <Link href="/industries/social-media">
                  <div>
                    <div className="font-medium">海外社媒管理团队</div>
                    <div className="text-xs text-muted-foreground">
                      多语言内容策划
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 定价 */}
          <Button
            variant="ghost"
            className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/pricing">定价</Link>
          </Button>

          {/* 博客 */}
          <Button
            variant="ghost"
            className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/blog">博客</Link>
          </Button>

          {/* 灵感市集 */}
          <Button
            variant="ghost"
            className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/community">灵感市集</Link>
          </Button>
        </nav>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          {/* Desktop Language Switcher */}
          <div className="hidden md:block">
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
          </div>

          {/* User Section */}
          {renderUserSection()}
        </div>
      </div>
    </header>
  );
}
