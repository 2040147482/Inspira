import { AIModelConfig, getAIConfig, getDefaultModel, getAvailableModels } from './ai-config';

// AI 消息接口
export interface AIMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

// AI 请求参数
export interface AIRequestParams {
    messages: AIMessage[];
    model?: AIModelConfig;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    stream?: boolean;
}

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
    provider: string;
    model?: string;
}

// AI 服务类
export class AIService {
    private config: ReturnType<typeof getAIConfig>;

    constructor() {
        this.config = getAIConfig();
    }

    // 生成文本内容
    async generateText(params: AIRequestParams): Promise<AIResponse> {
        const model = params.model || getDefaultModel();

        // 检查是否有可用的 API 密钥
        const availableModels = getAvailableModels();
        if (availableModels.length === 0) {
            throw new Error('至少需要配置一个 AI 提供商的 API 密钥');
        }

        try {
            switch (model.provider) {
                case 'deepseek':
                    return await this.callDeepSeekAPI(params, model);
                case 'tongyi':
                    return await this.callTongyiAPI(params, model);
                default:
                    throw new Error(`不支持的 AI 提供商: ${model.provider}`);
            }
        } catch (error) {
            console.error('AI 服务调用失败:', error);
            throw this.handleError(error, model);
        }
    }

    // 调用 DeepSeek API
    private async callDeepSeekAPI(params: AIRequestParams, model: AIModelConfig): Promise<AIResponse> {
        const { apiKey, baseUrl } = this.config.deepseek;

        if (!apiKey) {
            throw new Error('DeepSeek API 密钥未配置');
        }

        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: model.model,
                messages: params.messages,
                temperature: params.temperature ?? model.temperature,
                max_tokens: params.maxTokens ?? model.maxTokens,
                top_p: params.topP ?? model.topP,
                frequency_penalty: params.frequencyPenalty ?? model.frequencyPenalty,
                presence_penalty: params.presencePenalty ?? model.presencePenalty,
                stream: params.stream ?? false,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`DeepSeek API 错误: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();

        return {
            content: data.choices[0]?.message?.content || '',
            model: model.model,
            provider: 'deepseek',
            usage: data.usage ? {
                promptTokens: data.usage.prompt_tokens,
                completionTokens: data.usage.completion_tokens,
                totalTokens: data.usage.total_tokens,
            } : undefined,
            finishReason: data.choices[0]?.finish_reason,
        };
    }

    // 调用通义千问 API
    private async callTongyiAPI(params: AIRequestParams, model: AIModelConfig): Promise<AIResponse> {
        const { apiKey, baseUrl } = this.config.tongyi;

        if (!apiKey) {
            throw new Error('通义千问 API 密钥未配置');
        }

        const response = await fetch(`${baseUrl}/services/aigc/text-generation/generation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'X-DashScope-SSE': params.stream ? 'enable' : 'disable',
            },
            body: JSON.stringify({
                model: model.model,
                input: {
                    messages: params.messages.map(msg => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                },
                parameters: {
                    temperature: params.temperature ?? model.temperature,
                    max_tokens: params.maxTokens ?? model.maxTokens,
                    top_p: params.topP ?? model.topP,
                    frequency_penalty: params.frequencyPenalty ?? model.frequencyPenalty,
                    presence_penalty: params.presencePenalty ?? model.presencePenalty,
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`通义千问 API 错误: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();

        return {
            content: data.output?.text || data.output?.choices?.[0]?.message?.content || '',
            model: model.model,
            provider: 'tongyi',
            usage: data.usage ? {
                promptTokens: data.usage.input_tokens,
                completionTokens: data.usage.output_tokens,
                totalTokens: data.usage.total_tokens,
            } : undefined,
            finishReason: data.output?.finish_reason,
        };
    }

    // 错误处理
    private handleError(error: any, model: AIModelConfig): AIError {
        if (error instanceof Error) {
            return {
                code: 'AI_SERVICE_ERROR',
                message: error.message,
                provider: model.provider,
                model: model.model,
            };
        }

        return {
            code: 'UNKNOWN_ERROR',
            message: '未知错误',
            provider: model.provider,
            model: model.model,
        };
    }

    // 创建系统消息
    createSystemMessage(content: string): AIMessage {
        return {
            role: 'system',
            content,
        };
    }

    // 创建用户消息
    createUserMessage(content: string): AIMessage {
        return {
            role: 'user',
            content,
        };
    }

    // 创建助手消息
    createAssistantMessage(content: string): AIMessage {
        return {
            role: 'assistant',
            content,
        };
    }

    // 生成标题
    async generateTitle(keywords: string, platform: string, style: string): Promise<string> {
        const systemPrompt = `你是一个专业的标题生成专家。请根据用户提供的关键词、平台和风格要求，生成吸引人的标题。

要求：
1. 标题要符合指定平台的风格特点
2. 包含用户提供的关键词
3. 符合指定的风格要求
4. 长度适中，通常在10-30字之间
5. 具有吸引力和点击率

请只返回生成的标题，不要包含其他解释。`;

        const userPrompt = `关键词：${keywords}
平台：${platform}
风格：${style}

请生成一个符合要求的标题。`;

        const response = await this.generateText({
            messages: [
                this.createSystemMessage(systemPrompt),
                this.createUserMessage(userPrompt),
            ],
            temperature: 0.8,
            maxTokens: 100,
        });

        return response.content.trim();
    }

    // 生成品牌名
    async generateBrandName(description: string, style: string): Promise<string> {
        const systemPrompt = `你是一个专业的品牌命名专家。请根据产品描述和命名风格，生成独特的品牌名称。

要求：
1. 品牌名要简洁易记
2. 符合指定的命名风格
3. 与产品描述相关
4. 具有商业价值
5. 避免与现有品牌重名

请只返回生成的品牌名，不要包含其他解释。`;

        const userPrompt = `产品描述：${description}
命名风格：${style}

请生成一个符合要求的品牌名称。`;

        const response = await this.generateText({
            messages: [
                this.createSystemMessage(systemPrompt),
                this.createUserMessage(userPrompt),
            ],
            temperature: 0.7,
            maxTokens: 50,
        });

        return response.content.trim();
    }

    // 生成广告语
    async generateSlogan(brandName: string, sellingPoints: string, tone: string): Promise<string> {
        const systemPrompt = `你是一个专业的广告语创作专家。请根据品牌名称、卖点和语气要求，创作吸引人的广告语。

要求：
1. 突出品牌卖点
2. 符合指定的语气风格
3. 简洁有力，易于传播
4. 与品牌名称协调
5. 具有记忆点

请只返回生成的广告语，不要包含其他解释。`;

        const userPrompt = `品牌名称：${brandName}
核心卖点：${sellingPoints}
语气风格：${tone}

请创作一个符合要求的广告语。`;

        const response = await this.generateText({
            messages: [
                this.createSystemMessage(systemPrompt),
                this.createUserMessage(userPrompt),
            ],
            temperature: 0.8,
            maxTokens: 100,
        });

        return response.content.trim();
    }

    // 生成创意提示
    async generateCreativePrompt(scene: string, audience: string, angle: string): Promise<string> {
        const systemPrompt = `你是一个创意提示生成专家。请根据场景、受众和角度，生成有创意的提示词。

要求：
1. 结合场景特点
2. 考虑受众需求
3. 从指定角度切入
4. 激发创意灵感
5. 实用且可操作

请只返回生成的创意提示，不要包含其他解释。`;

        const userPrompt = `场景：${scene}
受众：${audience}
角度：${angle}

请生成一个创意提示。`;

        const response = await this.generateText({
            messages: [
                this.createSystemMessage(systemPrompt),
                this.createUserMessage(userPrompt),
            ],
            temperature: 0.9,
            maxTokens: 150,
        });

        return response.content.trim();
    }
}

// 创建 AI 服务实例
export const aiService = new AIService(); 