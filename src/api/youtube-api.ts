import { google } from 'googleapis';

import { unstable_cache } from 'next/cache';

// 設定 YouTube API
const YOUTUBE_API_KEY = String(process.env.NEXT_PRIVATE_YOUTUBE_API_KEY);
const youtube = google.youtube({ version: 'v3', auth: YOUTUBE_API_KEY });

const THIRTY_MINUTES = 1800; // 30分鐘
const TWO_HOURS = 7200; // 2小時

// 取得發燒影片（無緩存）
export const GetHotVideos = async () => {
    const response = await youtube.videos.list({
        part: ['snippet', 'statistics', 'contentDetails'],
        chart: 'mostPopular',
        regionCode: 'TW',
        maxResults: 50
    });

    return response;
};

// 取得發燒影片（帶緩存）
export const GetHotVideosWithCache = unstable_cache(async () => GetHotVideos(), ['get-hot-videos-cache'], {
    revalidate: TWO_HOURS,
    tags: ['youtube-hot-videos']
});

// 取得影片詳細資訊（無緩存）
export const GetVideoDetails = async (videoId: string) => {
    const response = await youtube.videos.list({
        part: ['snippet'],
        id: [videoId]
    });

    return response;
};

// 取得影片詳細資訊（帶緩存）
export const GetVideoDetailsWithCache = unstable_cache(
    async (videoId: string) => GetVideoDetails(videoId),
    ['get-video-details-cache'],
    {
        revalidate: THIRTY_MINUTES,
        tags: ['youtube-video-details']
    }
);

// 搜尋影片（無緩存）
export const SearchVideos = async (query: string, maxResults: number = 10) => {
    const response = await youtube.search.list({
        part: ['snippet'],
        q: query,
        type: ['video'],
        maxResults
    });

    return response;
};

// 搜尋影片（帶緩存）
export const SearchVideosWithCache = unstable_cache(
    async (query: string, maxResults: number = 10) => SearchVideos(query, maxResults),
    ['search-videos-cache'],
    {
        revalidate: THIRTY_MINUTES,
        tags: ['youtube-search']
    }
);

// 取得頻道資訊（無緩存）
export const GetChannelDetails = async (channelId: string) => {
    const response = await youtube.channels.list({
        part: ['snippet', 'statistics'],
        id: [channelId]
    });

    return response;
};

// 取得頻道資訊（帶緩存）
export const GetChannelDetailsWithCache = unstable_cache(
    async (channelId: string) => GetChannelDetails(channelId),
    ['get-channel-details-cache'],
    {
        revalidate: TWO_HOURS,
        tags: ['youtube-channel']
    }
);
