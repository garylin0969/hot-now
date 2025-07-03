import type { RedditApiResponse, SimplifiedRedditArticle } from '@/types';

const REDDIT_BASE_URL = 'https://www.reddit.com';

// Reddit所有看版的熱門文章
export const GetRedditHotArticles = async (limit: number = 50): Promise<RedditApiResponse> => {
    if (process.env.VERCEL === '1') {
        console.warn('Skipping Reddit fetch during Vercel build');
        return {
            kind: 'Listing',
            data: {
                after: null,
                dist: 0,
                modhash: '',
                geo_filter: null,
                children: [],
                before: null,
            },
        };
    }

    try {
        const response = await fetch(`${REDDIT_BASE_URL}/r/all/hot.json?limit=${limit}`, {
            next: {
                revalidate: 60 * 5, // 5 minutes
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: RedditApiResponse = await response.json();
        return data;
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
    if (process.env.VERCEL === '1') {
        console.warn('Skipping Reddit fetch during Vercel build');
        return {
            kind: 'Listing',
            data: {
                after: null,
                dist: 0,
                modhash: '',
                geo_filter: null,
                children: [],
                before: null,
            },
        };
    }
    try {
        const response = await fetch(`${REDDIT_BASE_URL}/r/${subreddit}/hot.json?limit=${limit}`, {
            next: {
                revalidate: 60 * 5, // 5 minutes
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: RedditApiResponse = await response.json();
        return data;
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
