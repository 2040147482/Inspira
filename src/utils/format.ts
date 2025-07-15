/**
 * 格式化工具函数集合
 */

/**
 * 格式化日期
 * @param date - 日期对象或日期字符串
 * @param options - 格式化选项
 * @returns 格式化后的日期字符串
 */
export function formatDate(
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('zh-CN', options).format(dateObj);
}

/**
 * 格式化相对时间（如：2小时前、3天前）
 * @param date - 日期对象或日期字符串
 * @returns 相对时间字符串
 */
export function formatRelativeTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    const intervals = [
        { label: '年', seconds: 31536000 },
        { label: '个月', seconds: 2592000 },
        { label: '周', seconds: 604800 },
        { label: '天', seconds: 86400 },
        { label: '小时', seconds: 3600 },
        { label: '分钟', seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return `${count}${interval.label}前`;
        }
    }

    return '刚刚';
}

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @param decimals - 小数位数，默认为2
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * 格式化数字，添加千分位分隔符
 * @param num - 数字
 * @returns 格式化后的数字字符串
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('zh-CN').format(num);
}

/**
 * 格式化货币
 * @param amount - 金额
 * @param currency - 货币代码，默认为CNY
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(amount: number, currency: string = 'CNY'): string {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * 截断文本并添加省略号
 * @param text - 原始文本
 * @param maxLength - 最大长度
 * @returns 截断后的文本
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * 将驼峰命名转换为短横线命名
 * @param str - 驼峰命名字符串
 * @returns 短横线命名字符串
 */
export function camelToKebab(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/**
 * 将短横线命名转换为驼峰命名
 * @param str - 短横线命名字符串
 * @returns 驼峰命名字符串
 */
export function kebabToCamel(str: string): string {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
} 