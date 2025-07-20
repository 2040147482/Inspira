import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

// 请求体接口
interface BrandNameRequest {
    description: string;
    style: string;
    model?: string;
}

// 响应接口
interface BrandNameResponse {
    success: boolean;
    data?: {
        brandName: string;
        model: string;
        provider: string;
    };
    error?: {
        code: string;
        message: string;
    };
}

export async function POST(request: NextRequest): Promise<NextResponse<BrandNameResponse>> {
    try {
        // 解析请求体
        const body: BrandNameRequest = await request.json();

        // 验证请求参数
        if (!body.description || !body.style) {
            return NextResponse.json({
                success: false,
                error: {
                    code: 'INVALID_REQUEST',
                    message: '产品描述和命名风格都是必需的',
                },
            }, { status: 400 });
        }

        // 调用 AI 服务生成品牌名
        const brandName = await aiService.generateBrandName(
            body.description,
            body.style
        );

        // 返回成功响应
        return NextResponse.json({
            success: true,
            data: {
                brandName,
                model: 'default',
                provider: 'ai-service',
            },
        });

    } catch (error) {
        console.error('品牌命名 API 错误:', error);

        return NextResponse.json({
            success: false,
            error: {
                code: 'GENERATION_ERROR',
                message: error instanceof Error ? error.message : '品牌命名生成失败',
            },
        }, { status: 500 });
    }
} 