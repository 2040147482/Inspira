import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

// 请求体接口
interface CreativePromptRequest {
    scene: string;
    audience: string;
    angle: string;
    model?: string;
}

// 响应接口
interface CreativePromptResponse {
    success: boolean;
    data?: {
        prompt: string;
        model: string;
        provider: string;
    };
    error?: {
        code: string;
        message: string;
    };
}

export async function POST(request: NextRequest): Promise<NextResponse<CreativePromptResponse>> {
    try {
        // 解析请求体
        const body: CreativePromptRequest = await request.json();

        // 验证请求参数
        if (!body.scene || !body.audience || !body.angle) {
            return NextResponse.json({
                success: false,
                error: {
                    code: 'INVALID_REQUEST',
                    message: '场景、受众和角度都是必需的',
                },
            }, { status: 400 });
        }

        // 调用 AI 服务生成创意提示
        const prompt = await aiService.generateCreativePrompt(
            body.scene,
            body.audience,
            body.angle
        );

        // 返回成功响应
        return NextResponse.json({
            success: true,
            data: {
                prompt,
                model: 'default',
                provider: 'ai-service',
            },
        });

    } catch (error) {
        console.error('创意提示生成 API 错误:', error);

        return NextResponse.json({
            success: false,
            error: {
                code: 'GENERATION_ERROR',
                message: error instanceof Error ? error.message : '创意提示生成失败',
            },
        }, { status: 500 });
    }
} 