/**
 * 环境变量验证和类型定义
 * 确保所有必需的环境变量都已正确配置
 */

// 客户端环境变量 (可在浏览器中访问)
export const clientEnv = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'IdeaBox',
} as const;

// 服务端环境变量 (仅在服务器端可用)
export const serverEnv = {
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
} as const;

// 验证必需的环境变量
export function validateClientEnv() {
    const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'] as const;

    for (const key of required) {
        if (!clientEnv[key]) {
            throw new Error(`Missing required environment variable: NEXT_PUBLIC_${key}`);
        }
    }
}

export function validateServerEnv() {
    // 只在服务器端运行
    if (typeof window !== 'undefined') return;

    const required = ['SUPABASE_SERVICE_KEY'] as const;

    for (const key of required) {
        if (!serverEnv[key]) {
            console.warn(`Missing optional environment variable: ${key}`);
        }
    }
}

// 开发环境检查
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

// 在应用启动时验证环境变量
if (typeof window !== 'undefined') {
    validateClientEnv();
} else {
    validateServerEnv();
} 