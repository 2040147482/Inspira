import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 中间件
 * 处理身份验证和路由保护
 */
export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    try {
        // 创建Supabase客户端
        const supabase = createMiddlewareClient({ req, res });

        // 刷新会话（如果存在）
        const {
            data: { session },
        } = await supabase.auth.getSession();

        // 定义受保护的路由
        const protectedRoutes = ['/dashboard', '/profile', '/settings'];
        const authRoutes = ['/auth/login', '/auth/register'];

        const isProtectedRoute = protectedRoutes.some(route =>
            req.nextUrl.pathname.startsWith(route)
        );
        const isAuthRoute = authRoutes.some(route =>
            req.nextUrl.pathname.startsWith(route)
        );

        // 如果访问受保护的路由但未登录，重定向到登录页
        if (isProtectedRoute && !session) {
            const loginUrl = new URL('/auth/login', req.url);
            loginUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        // 如果已登录但访问认证页面，重定向到首页
        if (isAuthRoute && session) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        return res;
    } catch (error) {
        console.error('Middleware error:', error);
        // 发生错误时，继续处理请求
        return res;
    }
}

/**
 * 配置中间件匹配的路径
 * 不包括静态文件和API路由（除了需要保护的）
 */
export const config = {
    matcher: [
        /*
         * 匹配所有请求路径，除了：
         * - _next/static (静态文件)
         * - _next/image (图片优化文件)
         * - favicon.ico (网站图标)
         * - public文件夹中的文件 (public/*)
         * - API路由（根据需要可以包含特定的API路由）
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}; 