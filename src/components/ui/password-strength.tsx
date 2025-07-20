'use client'

import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    validatePassword,
    getPasswordStrengthColor,
    getPasswordStrengthText,
    type PasswordValidationResult
} from '@/utils/password'

interface PasswordStrengthProps {
    password: string
    showRequirements?: boolean
    className?: string
}

interface RequirementItemProps {
    met: boolean
    text: string
}

function RequirementItem({ met, text }: RequirementItemProps) {
    return (
        <div className="flex items-center space-x-2">
            {met ? (
                <Check className="h-3 w-3 text-green-500" />
            ) : (
                <X className="h-3 w-3 text-red-500" />
            )}
            <span className={cn(
                'text-xs',
                met ? 'text-green-600' : 'text-red-600'
            )}>
                {text}
            </span>
        </div>
    )
}

export function PasswordStrength({
    password,
    showRequirements = true,
    className
}: PasswordStrengthProps) {
    if (!password) return null

    const validation = validatePassword(password)
    const strengthColor = getPasswordStrengthColor(validation.strength)
    const strengthText = getPasswordStrengthText(validation.strength)

    return (
        <div className={cn('space-y-2', className)}>
            {/* 强度指示器 */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">密码强度：</span>
                <span className={cn('text-sm font-medium', strengthColor)}>
                    {strengthText}
                </span>
            </div>

            {/* 强度条 */}
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={cn(
                        'h-2 rounded-full transition-all duration-300',
                        {
                            'bg-red-500 w-1/3': validation.strength === 'weak',
                            'bg-yellow-500 w-2/3': validation.strength === 'medium',
                            'bg-green-500 w-full': validation.strength === 'strong',
                        }
                    )}
                />
            </div>

            {/* 要求列表 */}
            {showRequirements && (
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground mb-2">密码要求：</p>
                    <div className="space-y-1">
                        <RequirementItem
                            met={validation.requirements.length}
                            text="至少8个字符"
                        />
                        <RequirementItem
                            met={validation.requirements.lowercase}
                            text="包含小写字母 (a-z)"
                        />
                        <RequirementItem
                            met={validation.requirements.uppercase}
                            text="包含大写字母 (A-Z)"
                        />
                        <RequirementItem
                            met={validation.requirements.number}
                            text="包含数字 (0-9)"
                        />
                        <RequirementItem
                            met={validation.requirements.special}
                            text="包含特殊字符"
                        />
                    </div>
                </div>
            )}
        </div>
    )
} 