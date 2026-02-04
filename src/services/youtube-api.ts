/**
 * @fileoverview YouTube API 服務
 * 使用 Fetch API 獲取發燒影片資訊，替代 googleapis 庫以解決依賴問題。
 */
import { YOUTUBE_CATEGORIES, type YouTubeCategoryKey } from '@/constants/youtube';
import type { YouTubeApiResponse } from '@/types/youtube';

/** YouTube API 金鑰 (從環境變數讀取) */
const YOUTUBE_API_KEY = String(process.env.NEXT_PRIVATE_YOUTUBE_API_KEY);

/** YouTube API 基礎 URL */
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * 獲取 YouTube 發燒影片列表
 *
 * @param categoryId - (選填) YouTube 影片類別 ID
 * @returns 包含發燒影片資料的 Promise 物件
 * @throws {Error} 當 API 金鑰未配置或 API 回傳異常時拋出錯誤
 */
export const GetYoutubeHotVideos = async (categoryId?: string): Promise<YouTubeApiResponse> => {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'undefined') {
        throw new Error('YouTube API key is not configured');
    }

    const params = new URLSearchParams({
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        regionCode: 'TW',
        maxResults: '50',
        key: YOUTUBE_API_KEY,
    });

    if (categoryId) {
        params.append('videoCategoryId', categoryId);
    }

    const response = await fetch(`${YOUTUBE_API_BASE_URL}/videos?${params.toString()}`, {
        next: {
            revalidate: 1800, // 30 分鐘
            tags: ['youtube-data'], // 統一快取標籤
        },
    });

    if (!response.ok) {
        throw new Error(`YouTube API error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as YouTubeApiResponse;
};

/**
 * 根據自定義類別鍵值獲取 YouTube 發燒影片
 *
 * @param categoryKey - 定義在 constants 中的類別鍵值
 * @returns 包含該類別發燒影片資料的 Promise 物件
 */
export const GetYoutubeHotVideosByCategory = async (categoryKey: YouTubeCategoryKey) => {
    const categoryId = YOUTUBE_CATEGORIES[categoryKey].id;
    return GetYoutubeHotVideos(categoryId);
};
