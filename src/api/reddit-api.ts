import axios from 'axios';
import type { RedditApiResponse, SimplifiedRedditArticle } from '@/types';

const REDDIT_BASE_URL = 'https://www.reddit.com';

// 配置 axios 实例
const redditAxios = axios.create({
    baseURL: REDDIT_BASE_URL,
    timeout: 10000,
});

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
