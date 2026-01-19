/**
 * @fileoverview Reddit 相關常數設定
 */

/**
 * Reddit 子版塊定義
 * label: 介面顯示名稱
 */
export const REDDIT_SUBREDDITS = {
    all: { label: 'All' },
    taiwanese: { label: 'Taiwanese' },
    china_irl: { label: 'China_irl' },
} as const;

/** Reddit 子版塊鍵值型別 */
export type RedditSubredditKey = keyof typeof REDDIT_SUBREDDITS;
