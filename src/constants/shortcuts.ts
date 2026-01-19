/**
 * @fileoverview 快捷方式相關常數設定
 */

/**
 * 快捷方式系統配置
 */
export const SHORTCUTS_CONFIG = {
    /** 最大快捷方式數量 */
    MAX_SHORTCUTS: 8,
    /** Favicon 圖標大小 */
    FAVICON_SIZE: 64,
    /** 預設圖標路徑 */
    DEFAULT_FAVICON: '/favicon.ico',
    /** 預設通訊協定 */
    DEFAULT_PROTOCOL: 'https://',
} as const;

/**
 * 對話框顯示訊息 (繁體中文)
 */
export const DIALOG_MESSAGES = {
    TITLE: '快捷方式',
    PLACEHOLDER: '添加網址',
    CANCEL: '取消',
    SAVE: '儲存',
    SUCCESS: '快捷方式已儲存',
    INVALID_URL_PREFIX: '無效的網址: ',
    INVALID_URL_TEMPLATE: '網址 {index}',
} as const;
