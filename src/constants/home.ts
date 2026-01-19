/**
 * @fileoverview 首頁相關常數設定
 * 包含首頁使用的標籤頁定義與型別。
 */

/**
 * 首頁主內容標籤頁定義
 * label: 顯示名稱, value: 對應的內容鍵值
 */
export const HOME_TABS = [
    { label: 'Youtube', value: 'youtube' },
    { label: 'PTT', value: 'ptt' },
    { label: 'BBC', value: 'bbc' },
    { label: 'Google', value: 'google' },
    { label: 'Gamer', value: 'gamer' },
    { label: 'Reddit', value: 'reddit' },
    { label: 'Komica', value: 'komica' },
] as const;

/** 首頁標籤頁的鍵值型別 */
export type HomeTabKey = (typeof HOME_TABS)[number]['value'];
