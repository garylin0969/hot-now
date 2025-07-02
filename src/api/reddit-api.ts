import type { RedditApiResponse, SimplifiedRedditPost } from '@/types';

const REDDIT_BASE_URL = 'https://www.reddit.com';

// Reddit所有看版的熱門文章
export const GetRedditHotPosts = async (limit: number = 50): Promise<RedditApiResponse> => {
    const response = await fetch(`${REDDIT_BASE_URL}/r/all/hot.json?limit=${limit}`, {
        cache: 'no-store',
    });
    const data: RedditApiResponse = await response.json();
    return data;
};

// 取得簡化的Reddit熱門文章資料
export const GetSimplifiedRedditHotPosts = async (limit: number = 50): Promise<SimplifiedRedditPost[]> => {
    const response = await GetRedditHotPosts(limit);

    return response?.data?.children?.map((post) => ({
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
};
