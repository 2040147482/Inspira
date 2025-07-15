import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并和条件化CSS类名的工具函数
 * 结合了clsx和tailwind-merge的功能
 * 
 * @param inputs - CSS类名或条件对象
 * @returns 合并后的CSS类名字符串
 * 
 * @example
 * cn('px-2 py-1', 'text-blue-500') // 'px-2 py-1 text-blue-500'
 * cn('px-2', { 'text-red-500': isError }) // 'px-2 text-red-500' (如果isError为true)
 * cn('p-2', 'p-4') // 'p-4' (tailwind-merge会处理冲突的类)
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
} 