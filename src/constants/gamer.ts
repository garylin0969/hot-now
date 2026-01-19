/**
 * @fileoverview 巴哈姆特 (Gamer) 相關常數設定
 */

/**
 * 巴哈姆特看板類別定義
 * label: 介面顯示名稱
 */
export const GAMER_CATEGORIES = {
    all: { label: '全部' },
    game: { label: '遊戲' },
    ac: { label: '動漫' },
    life: { label: '宅生活' },
} as const;

/** 巴哈姆特類別鍵值型別 */
export type GamerCategoryKey = keyof typeof GAMER_CATEGORIES;
