/**
 * 日期時間工具函數
 * 包含格式化為絕對時間與相對時間的功能
 */

/** 時間常量 (秒) */
const TIME_CONSTANTS = {
    MINUTE: 60,
    HOUR: 3600,
    DAY: 86400,
    MONTH: 86400 * 30,
} as const;

/**
 * 將日期格式化為 YYYY/MM/DD HH:mm 格式
 * @param dateStr - 日期字符串 (可被 new Date() 解析的格式)
 * @returns 格式化後的日期字符串，若解析失敗則返回原字串
 */
export const formatDateTime = (dateStr: string | number | Date): string => {
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return String(dateStr);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}`;
    } catch {
        return String(dateStr);
    }
};

/**
 * 將日期格式化為相對時間 (例如：5分鐘前、2小時前)
 * @param dateInput - 日期輸入 (可以是時間戳、日期字符串或 Date 對象)
 * @returns 相對時間字符串
 */
export const formatRelativeTime = (dateInput: string | number | Date): string => {
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return String(dateInput);

        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 0) return '剛剛'; // 處理未來時間或極短誤差

        if (diffInSeconds < TIME_CONSTANTS.HOUR) {
            const minutes = Math.floor(diffInSeconds / TIME_CONSTANTS.MINUTE);
            return `${Math.max(1, minutes)} 分鐘前`;
        }
        if (diffInSeconds < TIME_CONSTANTS.DAY) {
            const hours = Math.floor(diffInSeconds / TIME_CONSTANTS.HOUR);
            return `${hours} 小時前`;
        }
        if (diffInSeconds < TIME_CONSTANTS.MONTH) {
            const days = Math.floor(diffInSeconds / TIME_CONSTANTS.DAY);
            return `${days} 天前`;
        }
        const months = Math.floor(diffInSeconds / TIME_CONSTANTS.MONTH);
        return `${months} 個月前`;
    } catch {
        return String(dateInput);
    }
};
