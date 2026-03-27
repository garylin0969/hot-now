// 常量
export const SHORTCUTS_CONFIG = {
    MAX_SHORTCUTS: 8,
    FAVICON_SIZE: 64,
    DEFAULT_FAVICON: '/favicon.ico',
    DEFAULT_PROTOCOL: 'https://',
} as const;

// 正規化 URL
export const normalizeUrl = (url: string): string => {
    return url.startsWith('http') ? url : `${SHORTCUTS_CONFIG.DEFAULT_PROTOCOL}${url}`;
};

// 驗證 URL
export const isValidUrl = (url: string): boolean => {
    try {
        const urlWithProtocol = normalizeUrl(url);
        new URL(urlWithProtocol);
        return true;
    } catch {
        return false;
    }
};

// 獲取 favicon URL
export const getFaviconUrl = (url: string): string => {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=${SHORTCUTS_CONFIG.FAVICON_SIZE}`;
    } catch {
        return SHORTCUTS_CONFIG.DEFAULT_FAVICON;
    }
};

// 從 URL 提取標題
export const extractTitleFromUrl = (url: string): string => {
    try {
        const urlWithProtocol = normalizeUrl(url);
        const domain = new URL(urlWithProtocol).hostname;
        return domain.replace(/^www\./, '');
    } catch {
        return url;
    }
};

// 獲取快捷方式初始字母
export const getShortcutInitial = (title: string): string => {
    return title.charAt(0).toUpperCase();
};

// 在新分頁中打開 URL
export const openUrlInNewTab = (url: string): void => {
    const finalUrl = normalizeUrl(url);
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
};

// 生成快捷方式 ID
export const generateShortcutId = (index?: number): string => {
    const timestamp = Date.now();
    return index !== undefined ? `${timestamp}-${index}` : timestamp.toString();
};
