import React from 'react';

/**
 * 全局加载组件
 * 在路由切换时显示
 */
export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
            </div>
        </div>
    );
} 