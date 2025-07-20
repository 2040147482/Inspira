import { NextRequest, NextResponse } from 'next/server';
import { aiService, AIRequestParams } from '@/lib/ai-service';
import { getAvailableModels, getDefaultModel } from '@/lib/ai-config';

// 请求体接口
interface GenerateRequest {
    messages: Array<{
        role: 'system' | 'user' | 'assistant';
        content: string;
    }>;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    stream?: boolean;
}

// 响应接口
interface GenerateResponse {
    success: boolean;
    data?: {
        content: string;
        model: string;
        provider: string;
        usage?: {
            promptTokens: number;
            completionTokens: number;
            totalTokens: number;
        };
        finishReason?: string;
    };
    error?: {
        code: string;
        message: string;
    };
}

export async function POST(request: NextRequest): Promise<NextResponse<GenerateResponse>> {
    try {
        // 解析请求体
        const body: GenerateRequest = await request.json();

        // 验证请求参数
        if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
            return NextResponse.json({
                success: false,
                error: {
                    code: 'INVALID_REQUEST',
                    message: '消息数组不能为空',
                },
            }, { status: 400 });
        }

        // 验证消息格式
        for (const message of body.messages) {
            if (!message.role || !message.content) {
                return NextResponse.json({
                    success: false,
                    error: {
                        code: 'INVALID_MESSAGE',
                        message: '消息格式不正确',
                    },
                }, { status: 400 });
            }
        }

        // 获取模型配置
        let modelConfig;
        if (body.model) {
            const availableModels = getAvailableModels();
            modelConfig = availableModels.find(m => m.model === body.model);

            if (!modelConfig) {
                return NextResponse.json({
                    success: false,
                    error: {
                        code: 'MODEL_NOT_FOUND',
                        message: `模型 ${body.model} 不可用`,
                    },
                }, { status: 400 });
            }
        } else {
            modelConfig = getDefaultModel();
        }

        // 构建 AI 请求参数
        const aiParams: AIRequestParams = {
            messages: body.messages,
            model: modelConfig,
            temperature: body.temperature,
            maxTokens: body.maxTokens,
            topP: body.topP,
            frequencyPenalty: body.frequencyPenalty,
            presencePenalty: body.presencePenalty,
            stream: body.stream,
        };

        // 调用 AI 服务
        const response = await aiService.generateText(aiParams);

        // 返回成功响应
        return NextResponse.json({
            success: true,
            data: response,
        });

    } catch (error) {
        console.error('AI 生成 API 错误:', error);

        // 处理不同类型的错误
        if (error instanceof Error) {
            if (error.message.includes('API 密钥未配置')) {
                return NextResponse.json({
                    success: false,
                    error: {
                        code: 'API_KEY_MISSING',
                        message: 'AI API 密钥未配置',
                    },
                }, { status: 500 });
            }

            if (error.message.includes('API 错误')) {
                return NextResponse.json({
                    success: false,
                    error: {
                        code: 'API_ERROR',
                        message: error.message,
                    },
                }, { status: 500 });
            }
        }

        return NextResponse.json({
            success: false,
            error: {
                code: 'INTERNAL_ERROR',
                message: '服务器内部错误',
            },
        }, { status: 500 });
    }
}

// 获取可用模型列表
export async function GET(): Promise<NextResponse> {
    try {
        const availableModels = getAvailableModels();

        return NextResponse.json({
            success: true,
            data: {
                models: availableModels.map(model => ({
                    name: model.name,
                    model: model.model,
                    provider: model.provider,
                    maxTokens: model.maxTokens,
                })),
                defaultModel: getDefaultModel().model,
            },
        });
    } catch (error) {
        console.error('获取模型列表错误:', error);

        return NextResponse.json({
            success: false,
            error: {
                code: 'INTERNAL_ERROR',
                message: '获取模型列表失败',
            },
        }, { status: 500 });
    }
} 