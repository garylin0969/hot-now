import { google } from 'googleapis';
import { unstable_cache } from 'next/cache';

// 設定 YouTube API
const YOUTUBE_API_KEY = String(process.env.NEXT_PRIVATE_YOUTUBE_API_KEY);
const youtube = google.youtube({ version: 'v3', auth: YOUTUBE_API_KEY });

const THIRTY_MINUTES = 60 * 30; // 30分鐘
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
    const params = {
        part: ['snippet', 'statistics', 'contentDetails'],
        chart: 'mostPopular',
        regionCode: 'TW',
        maxResults: 50,
        ...(categoryId && { videoCategoryId: categoryId }),
    };

    const response = await youtube.videos.list(params);
    return response;
};

// 取得發燒影片（帶緩存）
export const GetYoutubeHotVideosWithCache = unstable_cache(
    async (categoryId?: string) => GetYoutubeHotVideos(categoryId),
    ['get-hot-videos-cache'],
    {
        revalidate: TWO_HOURS,
        tags: ['youtube-hot-videos'],
    }
);

// 取得特定類別的發燒影片（帶緩存）
export const GetYoutubeHotVideosByCategory = unstable_cache(
    async (categoryKey: YouTubeCategoryKey) => {
        const categoryId = YOUTUBE_CATEGORIES[categoryKey];
        return GetYoutubeHotVideos(categoryId);
    },
    ['get-hot-videos-by-category-cache'],
    {
        revalidate: TWO_HOURS,
        tags: ['youtube-hot-videos-by-category'],
    }
);

// 取得影片詳細資訊（無緩存）
export const GetYoutubeVideoDetails = async (videoId: string) => {
    const response = await youtube.videos.list({
        part: ['snippet'],
        id: [videoId],
    });

    return response;
};

// 取得影片詳細資訊（帶緩存）
export const GetYoutubeVideoDetailsWithCache = unstable_cache(
    async (videoId: string) => GetYoutubeVideoDetails(videoId),
    ['get-video-details-cache'],
    {
        revalidate: THIRTY_MINUTES,
        tags: ['youtube-video-details'],
    }
);

// 搜尋影片（無緩存）
export const GetYoutubeSearchVideos = async (query: string, maxResults: number = 10) => {
    const response = await youtube.search.list({
        part: ['snippet'],
        q: query,
        type: ['video'],
        maxResults,
    });

    return response;
};

// 搜尋影片（帶緩存）
export const GetYoutubeSearchVideosWithCache = unstable_cache(
    async (query: string, maxResults: number = 10) => GetYoutubeSearchVideos(query, maxResults),
    ['search-videos-cache'],
    {
        revalidate: THIRTY_MINUTES,
        tags: ['youtube-search'],
    }
);

// 取得頻道資訊（無緩存）
export const GetYoutubeChannelDetails = async (channelId: string) => {
    const response = await youtube.channels.list({
        part: ['snippet', 'statistics'],
        id: [channelId],
    });

    return response;
};

// 取得頻道資訊（帶緩存）
export const GetYoutubeChannelDetailsWithCache = unstable_cache(
    async (channelId: string) => GetYoutubeChannelDetails(channelId),
    ['get-channel-details-cache'],
    {
        revalidate: TWO_HOURS,
        tags: ['youtube-channel'],
    }
);
