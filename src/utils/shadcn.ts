/**
 * @fileoverview Shadcn UI 工具函數
 * 提供 CSS 類名合併與衝突解決功能。
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合併 CSS 類名
 * 結合 clsx 的條件式類名與 tailwind-merge 的衝突解決。
 *
 * @param inputs - CSS 類名列表 (字串、物件、陣列等)
 * @returns 合併後的 CSS 類名字符串
 */
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};
