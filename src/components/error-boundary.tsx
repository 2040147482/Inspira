'use client';

import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // 这里可以发送错误到监控服务
        // 例如: Sentry.captureException(error);
    }

    resetError = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return (
                    <FallbackComponent
                        error={this.state.error!}
                        resetError={this.resetError}
                    />
                );
            }

            return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />;
        }

        return this.props.children;
    }
}

interface ErrorFallbackProps {
    error: Error;
    resetError: () => void;
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 p-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600">出现了一些问题</h2>
                <p className="mt-2 text-gray-600">
                    抱歉，应用程序遇到了错误。请尝试刷新页面或稍后重试。
                </p>
                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-4 text-left">
                        <summary className="cursor-pointer text-sm text-gray-500">
                            错误详情 (仅开发环境显示)
                        </summary>
                        <pre className="mt-2 whitespace-pre-wrap text-xs text-red-500">
                            {error.message}
                            {error.stack}
                        </pre>
                    </details>
                )}
            </div>
            <button
                onClick={resetError}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
                重试
            </button>
        </div>
    );
}

export default ErrorBoundary; 