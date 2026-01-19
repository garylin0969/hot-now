/**
 * 數字處理工具函數
 * 包含數字縮寫格式化等功能
 */

/**
 * 將數字格式化為緊湊格式 (例如：1.2K, 1.5M)
 * @param num - 要格式化的數字或數字字符串
 * @returns 格式化後的字符串
 */
export const formatCompactNumber = (num: number | string): string => {
    const value = typeof num === 'string' ? parseFloat(num) : num;

    if (isNaN(value)) return String(num);

    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    } else {
        return value.toString();
    }
};
