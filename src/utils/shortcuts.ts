import { z } from 'zod';
import { DIALOG_MESSAGES, SHORTCUTS_CONFIG } from '@/constants/shortcuts';
import type { Shortcut } from '@/types/shortcuts';

export { SHORTCUTS_CONFIG };

/**
 * 正規化 URL
 * 如果 URL 沒有協定前綴，則添加預設協定
 *
 * @param url - 原始 URL
 * @returns 正規化後的 URL
 */
export const normalizeUrl = (url: string): string => {
    return url.startsWith('http') ? url : `${SHORTCUTS_CONFIG.DEFAULT_PROTOCOL}${url}`;
};

/**
 * 驗證 URL 格式是否有效
 *
 * @param url - 要驗證的 URL
 * @returns 若有效則返回 true，否則返回 false
 */
export const isValidUrl = (url: string): boolean => {
    try {
        const urlWithProtocol = normalizeUrl(url);
        new URL(urlWithProtocol);
        return true;
    } catch {
        return false;
    }
};

/**
 * 獲取網站 Favicon URL
 * 使用 Google Favicon 服務
 *
 * @param url - 網站 URL
 * @returns Favicon 圖片 URL
 */
export const getFaviconUrl = (url: string): string => {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=${SHORTCUTS_CONFIG.FAVICON_SIZE}`;
    } catch {
        return SHORTCUTS_CONFIG.DEFAULT_FAVICON;
    }
};

/**
 * 從 URL 提取顯示標題
 * 通常是域名，去除 www. 前綴
 *
 * @param url - 網站 URL
 * @returns 提取出的標題
 */
export const extractTitleFromUrl = (url: string): string => {
    try {
        const urlWithProtocol = normalizeUrl(url);
        const domain = new URL(urlWithProtocol).hostname;
        return domain.replace(/^www\./, '');
    } catch {
        return url;
    }
};

/**
 * 獲取標題的首字母 (用於無圖標時顯示)
 *
 * @param title - 標題文字
 * @returns 首字母 (大寫)
 */
export const getShortcutInitial = (title: string): string => {
    return title.charAt(0).toUpperCase();
};

/**
 * 在新分頁中打開 URL
 * 安全地打開連結 (noopener, noreferrer)
 *
 * @param url - 目標 URL
 */
export const openUrlInNewTab = (url: string): void => {
    const finalUrl = normalizeUrl(url);
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
};

/**
 * 生成快捷方式唯一 ID
 * 使用時間戳記加上可選的索引
 *
 * @param index - (選填) 索引值
 * @returns 唯一 ID 字串
 */
export const generateShortcutId = (index?: number): string => {
    const timestamp = Date.now();
    return index !== undefined ? `${timestamp}-${index}` : timestamp.toString();
};

/**
 * 創建新的快捷方式物件
 *
 * @param shortcut - 不含 ID 的快捷方式內容
 * @returns 包含自動生成 ID 的快捷方式物件
 */
export const createShortcut = (shortcut: Omit<Shortcut, 'id'>): Shortcut => ({
    ...shortcut,
    id: generateShortcutId(),
});

/**
 * 根據 ID 更新快捷方式陣列中的項目
 *
 * @param shortcuts - 現有的快捷方式陣列
 * @param id - 要更新的快捷方式 ID
 * @param updates - 更新內容
 * @returns 更新後的陣列副本
 */
export const updateShortcutById = (shortcuts: Shortcut[], id: string, updates: Partial<Shortcut>): Shortcut[] => {
    return shortcuts.map((shortcut) => (shortcut.id === id ? { ...shortcut, ...updates } : shortcut));
};

/**
 * 根據 ID 移除快捷方式
 *
 * @param shortcuts - 現有的快捷方式陣列
 * @param id - 要移除的快捷方式 ID
 * @returns 過濾後的陣列副本
 */
export const removeShortcutById = (shortcuts: Shortcut[], id: string): Shortcut[] => {
    return shortcuts.filter((shortcut) => shortcut.id !== id);
};

// ==========================================
// 表單驗證與處理邏輯
// ==========================================

/** URL 驗證 Schema */
export const urlSchema = z.string().refine(
    (url) => {
        if (!url.trim()) return true; // 空字串是有效的 (代表刪除或未填)
        return isValidUrl(url);
    },
    { message: 'Please enter a valid URL' }
);

/** 表單驗證 Schema */
export const shortcutsFormSchema = z.object({
    shortcuts: z.array(
        z.object({
            url: urlSchema,
        })
    ),
});

/** 快捷方式表單資料型別 */
export type ShortcutsFormData = z.infer<typeof shortcutsFormSchema>;

/**
 * 從 URL 創建快捷方式物件
 *
 * @param url - 輸入的 URL
 * @param index - 在列表中的索引
 * @param existingShortcut - (選填) 現有的快捷方式物件，用於保留 ID
 * @returns 新的快捷方式物件
 */
export const createShortcutFromUrl = (url: string, index: number, existingShortcut?: Shortcut): Shortcut => {
    const urlWithProtocol = normalizeUrl(url);
    return {
        id: existingShortcut?.id || generateShortcutId(index),
        url: urlWithProtocol,
        title: extractTitleFromUrl(url),
    };
};

/**
 * 獲取表單初始數據
 *
 * @param shortcuts - 當前的快捷方式列表
 * @returns 表單預設值物件
 */
export const getInitialFormData = (shortcuts: Shortcut[]): ShortcutsFormData => {
    return {
        shortcuts: Array.from({ length: SHORTCUTS_CONFIG.MAX_SHORTCUTS }, (_, i) => ({
            url: shortcuts[i]?.url || '',
        })),
    };
};

/**
 * 驗證並處理表單提交數據
 *
 * @param data - 表單數據
 * @param existingShortcuts - 現有的快捷方式列表
 * @returns 包含有效快捷方式與無效 URL 的結果物件
 */
export const validateAndProcessFormData = (
    data: ShortcutsFormData,
    existingShortcuts: Shortcut[]
): { validShortcuts: Shortcut[]; invalidUrls: string[] } => {
    const validShortcuts: Shortcut[] = [];
    const invalidUrls: string[] = [];

    data.shortcuts.forEach((shortcut, index) => {
        const url = shortcut.url.trim();
        if (url !== '') {
            if (isValidUrl(url)) {
                const existingShortcut = existingShortcuts[index];
                validShortcuts.push(createShortcutFromUrl(url, index, existingShortcut));
            } else {
                invalidUrls.push(DIALOG_MESSAGES.INVALID_URL_TEMPLATE.replace('{index}', (index + 1).toString()));
            }
        }
    });

    return { validShortcuts, invalidUrls };
};
