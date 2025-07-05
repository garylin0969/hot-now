import axios from 'axios';
import type { RedditApiResponse, SimplifiedRedditArticle } from '@/types';

const REDDIT_BASE_URL = 'https://www.reddit.com';
// Reddit爬蟲 API URL
const REDDIT_SCRAPER_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

// 配置 axios 实例
const redditAxios = axios.create({
    baseURL: REDDIT_BASE_URL,
    timeout: 10000,
});

// ========== 原本的 Reddit API 函數 (註解但保留) ==========
// 注意：這些函數可能會遇到 403 或 429 錯誤，已改用爬蟲資料方式

// Reddit所有看版的熱門文章
export const GetRedditHotArticles = async (limit: number = 50): Promise<RedditApiResponse> => {
    try {
        const response = await redditAxios.get(`/r/all/hot.json?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Reddit hot articles:', error);
        throw new Error(
            `Failed to fetch Reddit hot articles: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// 取得Reddit看版熱門文章
export const GetRedditHotArticlesBySubreddit = async (
    subreddit: string,
    limit: number = 50
): Promise<RedditApiResponse> => {
    try {
        const response = await redditAxios.get(`/r/${subreddit}/hot.json?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Reddit hot articles for subreddit ${subreddit}:`, error);
        throw new Error(
            `Failed to fetch Reddit hot articles for subreddit ${subreddit}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// 取得簡化的Reddit熱門文章資料
export const GetSimplifiedRedditHotArticles = async (limit: number = 50): Promise<SimplifiedRedditArticle[]> => {
    try {
        const response = await GetRedditHotArticles(limit);

        if (!response?.data?.children) {
            throw new Error('Invalid response structure from Reddit API');
        }

        return response.data.children.map((post) => ({
            id: post.data.id,
            title: post.data.title,
            author: post.data.author,
            subreddit: post.data.subreddit,
            score: post.data.score,
            num_comments: post.data.num_comments,
            url: post.data.url,
            thumbnail: post.data.thumbnail,
            created_utc: post.data.created_utc,
            permalink: post.data.permalink,
            is_video: post.data.is_video,
            preview_image: post.data.preview?.images[0]?.source?.url,
        }));
    } catch (error) {
        console.error('Error getting simplified Reddit hot articles:', error);
        throw new Error(
            `Failed to get simplified Reddit hot articles: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// 取得簡化的Reddit看版熱門文章
export const GetSimplifiedRedditHotArticlesBySubreddit = async (
    subreddit: string,
    limit: number = 50
): Promise<SimplifiedRedditArticle[]> => {
    try {
        const response = await GetRedditHotArticlesBySubreddit(subreddit, limit);

        if (!response?.data?.children) {
            throw new Error('Invalid response structure from Reddit API');
        }

        return response.data.children.map((post) => ({
            id: post.data.id,
            title: post.data.title,
            author: post.data.author,
            subreddit: post.data.subreddit,
            score: post.data.score,
            num_comments: post.data.num_comments,
            url: post.data.url,
            thumbnail: post.data.thumbnail,
            created_utc: post.data.created_utc,
            permalink: post.data.permalink,
            is_video: post.data.is_video,
            preview_image: post.data.preview?.images[0]?.source?.url,
        }));
    } catch (error) {
        console.error(`Error getting simplified Reddit hot articles for subreddit ${subreddit}:`, error);
        throw new Error(
            `Failed to get simplified Reddit hot articles for subreddit ${subreddit}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// ========== 新的爬蟲資料 API 函數 ==========

// 取得Reddit r/all熱門文章 (爬蟲資料)
export const GetRedditAllHotTrends = async (): Promise<RedditApiResponse> => {
    try {
        const response = await fetch(`${REDDIT_SCRAPER_BASE_URL}/reddit-all-hot.json`, {
            next: {
                revalidate: 60 * 60, // 1 hour
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.original_data;
    } catch (error) {
        console.error('Error fetching Reddit all hot trends:', error);
        throw new Error(
            `Failed to fetch Reddit all hot trends: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// 取得Reddit r/Taiwanese熱門文章 (爬蟲資料)
export const GetRedditTaiwaneseHotTrends = async (): Promise<RedditApiResponse> => {
    try {
        const response = await fetch(`${REDDIT_SCRAPER_BASE_URL}/reddit-taiwanese-hot.json`, {
            next: {
                revalidate: 60 * 60, // 1 hour
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.original_data;
    } catch (error) {
        console.error('Error fetching Reddit Taiwanese hot trends:', error);
        throw new Error(
            `Failed to fetch Reddit Taiwanese hot trends: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// 取得Reddit r/China_irl熱門文章 (爬蟲資料)
export const GetRedditChinaIrlHotTrends = async (): Promise<RedditApiResponse> => {
    try {
        const response = await fetch(`${REDDIT_SCRAPER_BASE_URL}/reddit-china-irl-hot.json`, {
            next: {
                revalidate: 60 * 60, // 1 hour
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.original_data;
    } catch (error) {
        console.error('Error fetching Reddit China_irl hot trends:', error);
        throw new Error(
            `Failed to fetch Reddit China_irl hot trends: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// 取得簡化的Reddit r/all熱門文章 (爬蟲資料)
export const GetSimplifiedRedditAllHotTrends = async (): Promise<SimplifiedRedditArticle[]> => {
    try {
        const response = await GetRedditAllHotTrends();

        if (!response?.data?.children) {
            throw new Error('Invalid response structure from Reddit scraper API');
        }

        return response.data.children.map((post) => ({
            id: post.data.id,
            title: post.data.title,
            author: post.data.author,
            subreddit: post.data.subreddit,
            score: post.data.score,
            num_comments: post.data.num_comments,
            url: post.data.url,
            thumbnail: post.data.thumbnail,
            created_utc: post.data.created_utc,
            permalink: post.data.permalink,
            is_video: post.data.is_video,
            preview_image: post.data.preview?.images[0]?.source?.url,
        }));
    } catch (error) {
        console.error('Error getting simplified Reddit all hot trends:', error);
        throw new Error(
            `Failed to get simplified Reddit all hot trends: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// 取得簡化的Reddit r/Taiwanese熱門文章 (爬蟲資料)
export const GetSimplifiedRedditTaiwaneseHotTrends = async (): Promise<SimplifiedRedditArticle[]> => {
    try {
        const response = await GetRedditTaiwaneseHotTrends();

        if (!response?.data?.children) {
            throw new Error('Invalid response structure from Reddit scraper API');
        }

        return response.data.children.map((post) => ({
            id: post.data.id,
            title: post.data.title,
            author: post.data.author,
            subreddit: post.data.subreddit,
            score: post.data.score,
            num_comments: post.data.num_comments,
            url: post.data.url,
            thumbnail: post.data.thumbnail,
            created_utc: post.data.created_utc,
            permalink: post.data.permalink,
            is_video: post.data.is_video,
            preview_image: post.data.preview?.images[0]?.source?.url,
        }));
    } catch (error) {
        console.error('Error getting simplified Reddit Taiwanese hot trends:', error);
        throw new Error(
            `Failed to get simplified Reddit Taiwanese hot trends: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

// 取得簡化的Reddit r/China_irl熱門文章 (爬蟲資料)
export const GetSimplifiedRedditChinaIrlHotTrends = async (): Promise<SimplifiedRedditArticle[]> => {
    try {
        const response = await GetRedditChinaIrlHotTrends();

        if (!response?.data?.children) {
            throw new Error('Invalid response structure from Reddit scraper API');
        }

        return response.data.children.map((post) => ({
            id: post.data.id,
            title: post.data.title,
            author: post.data.author,
            subreddit: post.data.subreddit,
            score: post.data.score,
            num_comments: post.data.num_comments,
            url: post.data.url,
            thumbnail: post.data.thumbnail,
            created_utc: post.data.created_utc,
            permalink: post.data.permalink,
            is_video: post.data.is_video,
            preview_image: post.data.preview?.images[0]?.source?.url,
        }));
    } catch (error) {
        console.error('Error getting simplified Reddit China_irl hot trends:', error);
        throw new Error(
            `Failed to get simplified Reddit China_irl hot trends: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};
