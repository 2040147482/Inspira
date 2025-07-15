// 应用配置常量
export const APP_CONFIG = {
    name: 'IdeaBox',
    fullName: 'IdeaBox - 灵感火花工具箱',
    description: '为内容创作者、品牌从业者、营销人和自由撰稿人提供一站式创意生成工具',
    version: '0.1.0',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

// 路由常量
export const ROUTES = {
    HOME: '/',
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        FORGOT_PASSWORD: '/auth/forgot-password',
    },
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    SETTINGS: '/settings',
} as const;

// API 端点常量
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
    },
    USERS: '/api/users',
    TASKS: '/api/tasks',
} as const;

// 验证规则常量
export const VALIDATION = {
    EMAIL: {
        MIN_LENGTH: 5,
        MAX_LENGTH: 100,
        REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 100,
    },
    NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 50,
    },
} as const;

// 主题常量
export const THEME = {
    COLORS: {
        PRIMARY: '#3b82f6',
        SECONDARY: '#6b7280',
        SUCCESS: '#10b981',
        WARNING: '#f59e0b',
        ERROR: '#ef4444',
    },
    BREAKPOINTS: {
        SM: '640px',
        MD: '768px',
        LG: '1024px',
        XL: '1280px',
        '2XL': '1536px',
    },
} as const;

// 数据库表名常量 (如果使用)
export const DB_TABLES = {
    USERS: 'users',
    PROFILES: 'profiles',
    TASKS: 'tasks',
    CATEGORIES: 'categories',
} as const; 