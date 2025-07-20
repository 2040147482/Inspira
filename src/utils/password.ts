/**
 * 密码强度验证工具函数
 */

export interface PasswordValidationResult {
    isValid: boolean
    errors: string[]
    strength: 'weak' | 'medium' | 'strong'
    requirements: {
        length: boolean
        lowercase: boolean
        uppercase: boolean
        number: boolean
        special: boolean
    }
}

/**
 * 验证密码强度
 * @param password 要验证的密码
 * @returns 验证结果
 */
export function validatePassword(password: string): PasswordValidationResult {
    const errors: string[] = []
    const requirements = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};:'"|<>?,./`~]/.test(password)
    }

    // 检查长度
    if (!requirements.length) {
        errors.push('密码长度至少为8个字符')
    }

    // 检查小写字母
    if (!requirements.lowercase) {
        errors.push('密码应包含至少一个小写字母 (a-z)')
    }

    // 检查大写字母
    if (!requirements.uppercase) {
        errors.push('密码应包含至少一个大写字母 (A-Z)')
    }

    // 检查数字
    if (!requirements.number) {
        errors.push('密码应包含至少一个数字 (0-9)')
    }

    // 检查特殊字符
    if (!requirements.special) {
        errors.push('密码应包含至少一个特殊字符 (!@#$%^&*()_+-=[]{};\':"|<>?,./`~)')
    }

    // 计算强度
    const metRequirements = Object.values(requirements).filter(Boolean).length
    let strength: 'weak' | 'medium' | 'strong' = 'weak'

    if (metRequirements >= 4 && password.length >= 10) {
        strength = 'strong'
    } else if (metRequirements >= 3 && password.length >= 8) {
        strength = 'medium'
    }

    return {
        isValid: errors.length === 0,
        errors,
        strength,
        requirements
    }
}

/**
 * 获取密码强度颜色
 * @param strength 密码强度
 * @returns CSS 颜色类名
 */
export function getPasswordStrengthColor(strength: 'weak' | 'medium' | 'strong'): string {
    switch (strength) {
        case 'weak':
            return 'text-red-500'
        case 'medium':
            return 'text-yellow-500'
        case 'strong':
            return 'text-green-500'
        default:
            return 'text-gray-500'
    }
}

/**
 * 获取密码强度文本
 * @param strength 密码强度
 * @returns 强度描述文本
 */
export function getPasswordStrengthText(strength: 'weak' | 'medium' | 'strong'): string {
    switch (strength) {
        case 'weak':
            return '弱'
        case 'medium':
            return '中等'
        case 'strong':
            return '强'
        default:
            return '未知'
    }
}

/**
 * 生成密码要求提示文本
 * @returns 密码要求提示
 */
export function getPasswordRequirementsText(): string {
    return '密码长度至少为8个字符，应至少包含以下各类字符中的一个：小写字母 (a-z)、大写字母 (A-Z)、数字 (0-9)、特殊字符 (!@#$%^&*()_+-=[]{};\':"|<>?,./`~)'
} 