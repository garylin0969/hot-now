/**
 * @fileoverview YouTube API 服務
 * 使用 Google API Client 獲取發燒影片資訊。
 */
import { google } from 'googleapis';
import { YOUTUBE_CATEGORIES, type YouTubeCategoryKey } from '@/constants/youtube';

/** YouTube API 金鑰 (從環境變數讀取) */
const YOUTUBE_API_KEY = String(process.env.NEXT_PRIVATE_YOUTUBE_API_KEY);

/** 初始化 YouTube API v3 客戶端 */
const youtube = google.youtube({ version: 'v3', auth: YOUTUBE_API_KEY });

/**
 * 獲取 YouTube 發燒影片列表
 *
 * @param categoryId - (選填) YouTube 影片類別 ID
 * @returns 包含發燒影片資料的 Promise 物件
 * @throws {Error} 當 API 金鑰未配置或 API 回傳異常時拋出錯誤
 */
export const GetYoutubeHotVideos = async (categoryId?: string) => {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'undefined') {
        throw new Error('YouTube API key is not configured');
    }

    const params = {
        part: ['snippet', 'statistics', 'contentDetails'],
        chart: 'mostPopular',
        regionCode: 'TW',
        maxResults: 50,
        ...(categoryId && { videoCategoryId: categoryId }),
    };

    const response = await youtube.videos.list(params);

    if (!response.data) {
        throw new Error('No data received from YouTube API');
    }

    // 將 googleapis 回傳的物件轉換為純物件，避免序列化問題
    return JSON.parse(JSON.stringify(response.data));
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
