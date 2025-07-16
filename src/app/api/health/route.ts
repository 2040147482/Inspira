import { NextRequest, NextResponse } from 'next/server';

/**
 * 健康检查端点
 * GET /api/health
 */
export async function GET(_request: NextRequest) {
    try {
        return NextResponse.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: process.env.npm_package_version || '0.1.0',
            environment: process.env.NODE_ENV || 'development',
        });
    } catch (error) {
        console.error('Health check failed:', error);
        return NextResponse.json(
            {
                status: 'error',
                message: 'Health check failed',
            },
            { status: 500 }
        );
    }
} 