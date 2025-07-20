import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

// 请求体接口
interface TitleRequest {
    keywords: string;
    platform: string;
    style: string;
    model?: string;
}

// 响应接口
interface TitleResponse {
    success: boolean;
    data?: {
        title: string;
        model: string;
        provider: string;
    };
    error?: {
        code: string;
        message: string;
    };
}

export async function POST(request: NextRequest): Promise<NextResponse<TitleResponse>> {
    try {
        // 解析请求体
        const body: TitleRequest = await request.json();

        // 验证请求参数
        if (!body.keywords || !body.platform || !body.style) {
            return NextResponse.json({
                success: false,
                error: {
                    code: 'INVALID_REQUEST',
                    message: '关键词、平台和风格都是必需的',
                },
            }, { status: 400 });
        }

        // 调用 AI 服务生成标题
        const title = await aiService.generateTitle(
            body.keywords,
            body.platform,
            body.style
        );

        // 返回成功响应
        return NextResponse.json({
            success: true,
            data: {
                title,
                model: 'default',
                provider: 'ai-service',
            },
        });

    } catch (error) {
        console.error('标题生成 API 错误:', error);

        return NextResponse.json({
            success: false,
            error: {
                code: 'GENERATION_ERROR',
                message: error instanceof Error ? error.message : '标题生成失败',
            },
        }, { status: 500 });
    }
} 