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
                <h2 className="mt-2 text-2xl text-gray-600">页面未找到</h2>
                <p className="mt-4 text-gray-500">
                    抱歉，您访问的页面不存在或已被移除。
                </p>
            </div>

            <div className="flex space-x-4">
                <Link
                    href="/"
                    className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    返回首页
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="rounded border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    返回上一页
                </button>
            </div>
        </div>
    );
} 