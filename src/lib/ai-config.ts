// AI 服务配置
export interface AIModelConfig {
    name: string;
    provider: 'deepseek' | 'tongyi';
    model: string;
    maxTokens: number;
    temperature: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
}

export interface AIProviderConfig {
    deepseek: {
        apiKey: string;
        baseUrl: string;
        models: {
            chat: string;
            coder: string;
        };
    };
    tongyi: {
        apiKey: string;
        baseUrl: string;
        models: {
            qwen: string;
            qwenPlus: string;
            qwenTurbo: string;
        };
    };
}

// 默认模型配置
export const DEFAULT_MODELS: Record<string, AIModelConfig> = {
    'deepseek-chat': {
        name: 'DeepSeek Chat',
        provider: 'deepseek',
        model: 'deepseek-chat',
        maxTokens: 4096,
        temperature: 0.7,
        topP: 0.9,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0,
    },
    'deepseek-coder': {
        name: 'DeepSeek Coder',
        provider: 'deepseek',
        model: 'deepseek-coder',
        maxTokens: 4096,
        temperature: 0.2,
        topP: 0.9,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0,
    },
    'qwen-turbo': {
        name: '通义千问 Turbo',
        provider: 'tongyi',
        model: 'qwen-turbo',
        maxTokens: 4096,
        temperature: 0.7,
        topP: 0.9,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0,
    },
    'qwen-plus': {
        name: '通义千问 Plus',
        provider: 'tongyi',
        model: 'qwen-plus',
        maxTokens: 8192,
        temperature: 0.7,
        topP: 0.9,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0,
    },
    'qwen-max': {
        name: '通义千问 Max',
        provider: 'tongyi',
        model: 'qwen-max',
        maxTokens: 8192,
        temperature: 0.7,
        topP: 0.9,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0,
    },
};

// 获取 AI 配置
export function getAIConfig(): AIProviderConfig {
    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    const tongyiApiKey = process.env.TONGYI_API_KEY;

    return {
        deepseek: {
            apiKey: deepseekApiKey || '',
            baseUrl: 'https://api.deepseek.com/v1',
            models: {
                chat: 'deepseek-chat',
                coder: 'deepseek-coder',
            },
        },
        tongyi: {
            apiKey: tongyiApiKey || '',
            baseUrl: 'https://dashscope.aliyuncs.com/api/v1',
            models: {
                qwen: 'qwen-turbo',
                qwenPlus: 'qwen-plus',
                qwenTurbo: 'qwen-turbo',
            },
        },
    };
}

// 获取可用模型列表
export function getAvailableModels(): AIModelConfig[] {
    const config = getAIConfig();
    const availableModels: AIModelConfig[] = [];

    if (config.deepseek.apiKey) {
        availableModels.push(DEFAULT_MODELS['deepseek-chat']);
        availableModels.push(DEFAULT_MODELS['deepseek-coder']);
    }

    if (config.tongyi.apiKey) {
        availableModels.push(DEFAULT_MODELS['qwen-turbo']);
        availableModels.push(DEFAULT_MODELS['qwen-plus']);
        availableModels.push(DEFAULT_MODELS['qwen-max']);
    }

    return availableModels;
}

// 获取默认模型
export function getDefaultModel(): AIModelConfig {
    const availableModels = getAvailableModels();

    // 优先使用通义千问，然后是 DeepSeek
    const tongyiModel = availableModels.find(m => m.provider === 'tongyi');
    if (tongyiModel) {
        return tongyiModel;
    }

    const deepseekModel = availableModels.find(m => m.provider === 'deepseek');
    if (deepseekModel) {
        return deepseekModel;
    }

    // 如果没有可用的模型，返回一个默认配置（用于构建时）
    return DEFAULT_MODELS['qwen-turbo'];
} 