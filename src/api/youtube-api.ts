import { google } from 'googleapis';
import { unstable_cache } from 'next/cache';

// 設定 YouTube API
const YOUTUBE_API_KEY = String(process.env.NEXT_PRIVATE_YOUTUBE_API_KEY);
const youtube = google.youtube({ version: 'v3', auth: YOUTUBE_API_KEY });

const TWO_HOURS = 60 * 60 * 2; // 2小時

// YouTube 類別定義
export const YOUTUBE_CATEGORIES = {
    latest: undefined, // 最新 (所有類別)
    gaming: '20', // 遊戲
    music: '10', // 音樂
    film: '1', // 電影
} as const;

export type YouTubeCategoryKey = keyof typeof YOUTUBE_CATEGORIES;

// 取得發燒影片（無緩存）
export const GetYoutubeHotVideos = async (categoryId?: string) => {
    try {
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

        return response;
    } catch (error) {
        console.error('Error fetching YouTube hot videos:', error);
        throw new Error(
            `Failed to fetch YouTube hot videos: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// 取得發燒影片（帶緩存）
export const GetYoutubeHotVideosWithCache = unstable_cache(
    async (categoryId?: string) => {
        try {
            return await GetYoutubeHotVideos(categoryId);
        } catch (error) {
            console.error('Error in cached YouTube hot videos:', error);
            throw error;
        }
    },
    ['get-hot-videos-cache'],
    {
        revalidate: TWO_HOURS,
        tags: ['youtube-hot-videos'],
    }
);

// 取得特定類別的發燒影片（帶緩存）
export const GetYoutubeHotVideosByCategory = unstable_cache(
    async (categoryKey: YouTubeCategoryKey) => {
        try {
            const categoryId = YOUTUBE_CATEGORIES[categoryKey];
            return await GetYoutubeHotVideos(categoryId);
        } catch (error) {
            console.error(`Error fetching YouTube hot videos for category ${categoryKey}:`, error);
            throw new Error(
                `Failed to fetch YouTube hot videos for category ${categoryKey}: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    },
    ['get-hot-videos-by-category-cache'],
    {
        revalidate: TWO_HOURS,
        tags: ['youtube-hot-videos-by-category'],
    }
);
