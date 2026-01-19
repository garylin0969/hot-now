/**
 * @fileoverview Reddit API 服務
 * 處理與 Reddit 相關的資料獲取邏輯。
 */
import type { RedditSubredditKey } from '@/constants/reddit';
import { fetchFromScraper } from '@/services/api-client';
import type { RedditApiResponse, SimplifiedRedditArticle } from '@/types';

/** Reddit 子版塊與其對應的端點路徑映射表 */
const REDDIT_ENDPOINTS: Record<RedditSubredditKey, string> = {
    all: 'reddit-all-hot.json',
    taiwanese: 'reddit-taiwanese-hot.json',
    china_irl: 'reddit-china-irl-hot.json',
};

/**
 * 獲取 Reddit 熱門文章原始資料 (爬蟲資料)
 *
 * @param subreddit - 子版塊鍵值
 * @returns 包含原始 Reddit API 回應的 Promise 物件
 */
export const GetRedditTrends = async (subreddit: RedditSubredditKey): Promise<RedditApiResponse> => {
    const endpoint = REDDIT_ENDPOINTS[subreddit];
    const data = await fetchFromScraper<{ original_data: RedditApiResponse }>(endpoint);
    return data.original_data;
};

/**
 * 獲取簡化後的 Reddit 熱門文章列表 (爬蟲資料)
 *
 * @param subreddit - 子版塊鍵值
 * @returns 包含簡化文章物件陣列的 Promise 物件
 * @throws {Error} 當回應資料結構不正確時拋出錯誤
 */
export const GetSimplifiedRedditTrends = async (subreddit: RedditSubredditKey): Promise<SimplifiedRedditArticle[]> => {
    const response = await GetRedditTrends(subreddit);

    if (!response?.data?.children) {
        throw new Error(`Invalid response structure from Reddit scraper API for ${subreddit}`);
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
};
