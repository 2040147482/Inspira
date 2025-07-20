import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

// 请求体接口
interface SloganRequest {
    brandName: string;
    sellingPoints: string;
    tone: string;
    model?: string;
}

// 响应接口
interface SloganResponse {
    success: boolean;
    data?: {
        slogan: string;
        model: string;
        provider: string;
    };
    error?: {
        code: string;
        message: string;
    };
}

export async function POST(request: NextRequest): Promise<NextResponse<SloganResponse>> {
    try {
        // 解析请求体
        const body: SloganRequest = await request.json();

        // 验证请求参数
        if (!body.brandName || !body.sellingPoints || !body.tone) {
            return NextResponse.json({
                success: false,
                error: {
                    code: 'INVALID_REQUEST',
                    message: '品牌名称、卖点和语气风格都是必需的',
                },
            }, { status: 400 });
        }

        // 调用 AI 服务生成广告语
        const slogan = await aiService.generateSlogan(
            body.brandName,
            body.sellingPoints,
            body.tone
        );

        // 返回成功响应
        return NextResponse.json({
            success: true,
            data: {
                slogan,
                model: 'default',
                provider: 'ai-service',
            },
        });

    } catch (error) {
        console.error('广告语生成 API 错误:', error);

        return NextResponse.json({
            success: false,
            error: {
                code: 'GENERATION_ERROR',
                message: error instanceof Error ? error.message : '广告语生成失败',
            },
        }, { status: 500 });
    }
} 