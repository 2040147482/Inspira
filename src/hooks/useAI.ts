import { useState, useCallback } from 'react';

// AI 响应接口
export interface AIResponse {
    content: string;
    model: string;
    provider: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    finishReason?: string;
}

// AI 错误接口
export interface AIError {
    code: string;
    message: string;
}

// AI 生成参数
export interface AIGenerateParams {
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

// AI Hook 状态
export interface AIState {
    loading: boolean;
    error: AIError | null;
    data: AIResponse | null;
}

// AI Hook 返回值
export interface AIHookReturn extends AIState {
    generate: (params: AIGenerateParams) => Promise<void>;
    generateTitle: (keywords: string, platform: string, style: string) => Promise<string>;
    generateBrandName: (description: string, style: string) => Promise<string>;
    generateSlogan: (brandName: string, sellingPoints: string, tone: string) => Promise<string>;
    generateCreativePrompt: (scene: string, audience: string, angle: string) => Promise<string>;
    reset: () => void;
}

// 通用 AI 生成函数
async function callAIEndpoint(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`/api/ai/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.error?.message || 'AI 服务调用失败');
    }

    return result.data;
}

// AI Hook
export function useAI(): AIHookReturn {
    const [state, setState] = useState<AIState>({
        loading: false,
        error: null,
        data: null,
    });

    // 通用生成函数
    const generate = useCallback(async (params: AIGenerateParams): Promise<void> => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const data = await callAIEndpoint('generate', params);
            setState(prev => ({ ...prev, loading: false, data }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: {
                    code: 'GENERATION_ERROR',
                    message: error instanceof Error ? error.message : '生成失败',
                },
            }));
        }
    }, []);

    // 生成标题
    const generateTitle = useCallback(async (keywords: string, platform: string, style: string): Promise<string> => {
        try {
            const data = await callAIEndpoint('title', { keywords, platform, style });
            return data.title;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : '标题生成失败');
        }
    }, []);

    // 生成品牌名
    const generateBrandName = useCallback(async (description: string, style: string): Promise<string> => {
        try {
            const data = await callAIEndpoint('brand-name', { description, style });
            return data.brandName;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : '品牌命名失败');
        }
    }, []);

    // 生成广告语
    const generateSlogan = useCallback(async (brandName: string, sellingPoints: string, tone: string): Promise<string> => {
        try {
            const data = await callAIEndpoint('slogan', { brandName, sellingPoints, tone });
            return data.slogan;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : '广告语生成失败');
        }
    }, []);

    // 生成创意提示
    const generateCreativePrompt = useCallback(async (scene: string, audience: string, angle: string): Promise<string> => {
        try {
            const data = await callAIEndpoint('creative-prompt', { scene, audience, angle });
            return data.prompt;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : '创意提示生成失败');
        }
    }, []);

    // 重置状态
    const reset = useCallback(() => {
        setState({
            loading: false,
            error: null,
            data: null,
        });
    }, []);

    return {
        ...state,
        generate,
        generateTitle,
        generateBrandName,
        generateSlogan,
        generateCreativePrompt,
        reset,
    };
}

// 获取可用模型列表
export async function getAvailableModels() {
    try {
        const response = await fetch('/api/ai/generate');
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error?.message || '获取模型列表失败');
        }

        return result.data;
    } catch (error) {
        console.error('获取模型列表错误:', error);
        throw error;
    }
} 