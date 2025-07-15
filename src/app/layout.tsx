import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IdeaBox - 灵感火花工具箱',
  description:
    '为内容创作者、品牌从业者、营销人和自由撰稿人提供一站式创意生成工具',
  keywords: ['创意生成', 'AI工具', '内容创作', '品牌命名', '标题生成'],
  authors: [{ name: 'IdeaBox Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
