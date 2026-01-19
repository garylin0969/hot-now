/**
 * @fileoverview YouTube 相關常數設定
 */

/**
 * YouTube 影片類別定義
 * id: YouTube API 使用的分類 ID, label: 介面顯示名稱
 */
export const YOUTUBE_CATEGORIES = {
    latest: { id: undefined, label: '最新' },
    gaming: { id: '20', label: '遊戲' },
    music: { id: '10', label: '音樂' },
    film: { id: '1', label: '電影' },
} as const;

/** YouTube 類別鍵值型別 */
export type YouTubeCategoryKey = keyof typeof YOUTUBE_CATEGORIES;
