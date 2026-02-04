/**
 * @fileoverview 基礎 API 客戶端配置
 * 提供從爬蟲資料源獲取數據的通用工具函數。
 */

/** 爬蟲資料的基礎 URL */
const SCRAPER_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

/**
 * 從爬蟲資料源獲取數據的通用函數
 *
 * @template T 預期的回應資料型別
 * @param endpoint - JSON 檔案的端點路徑 (不包含開頭的 /)
 * @returns 包含解析後資料的 Promise 物件
 * @throws {Error} 當 HTTP 請求失敗時拋出錯誤
 */
export const fetchFromScraper = async <T>(endpoint: string): Promise<T> => {
    // 確保 endpoint 不以 / 開頭，避免雙重斜線
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const response = await fetch(`${SCRAPER_BASE_URL}/${cleanEndpoint}`, {
        next: {
            revalidate: 1800, // 30 分鐘
            tags: ['scraper-data'], // 統一快取標籤
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} fetching ${cleanEndpoint}`);
    }

    return response.json();
};
