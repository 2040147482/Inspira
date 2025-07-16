import Link from 'next/link';

/**
 * 404 页面
 * 当用户访问不存在的页面时显示
 */
export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-8">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <h2 className="mt-2 text-2xl text-gray-600">您访问的页面不存在。</h2>
            
            </div>

        </div>
    );
} 