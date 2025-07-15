'use client';

import { useEffect } from 'react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * 全局错误页面
 * 处理应用程序中的未捕获错误
 */
export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // 记录错误到控制台
        console.error('Application error:', error);

        // 这里可以发送错误到监控服务
        // 例如: Sentry.captureException(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">出错了</h1>
                <h2 className="mt-2 text-xl text-gray-800">应用程序遇到了错误</h2>
                <p className="mt-4 text-gray-600">
                    抱歉，页面无法正常加载。请尝试重新加载页面，如果问题仍然存在，请联系我们的支持团队。
                </p>

                {/* 开发环境下显示错误详情 */}
                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-6 max-w-2xl text-left">
                        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                            查看错误详情 (仅开发环境显示)
                        </summary>
                        <div className="mt-2 rounded bg-gray-50 p-4">
                            <pre className="whitespace-pre-wrap text-xs text-red-600">
                                <strong>错误信息:</strong> {error.message}
                                {error.digest && (
                                    <>
                                        <br />
                                        <strong>错误ID:</strong> {error.digest}
                                    </>
                                )}
                                {error.stack && (
                                    <>
                                        <br />
                                        <strong>堆栈跟踪:</strong>
                                        <br />
                                        {error.stack}
                                    </>
                                )}
                            </pre>
                        </div>
                    </details>
                )}
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={reset}
                    className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    重试
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    className="rounded border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    返回首页
                </button>
            </div>
        </div>
    );
} 