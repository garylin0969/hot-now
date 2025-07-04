'use client';

import useRedditHotArticlesQuery from './use-reddit-hot-articles-query';
import useRedditSubredditArticlesQuery from './use-reddit-subreddit-articles-query';

// 獲取所有 Reddit 查詢的統一 hook
const useAllRedditQuery = (limit: number = 50) => {
    const allArticlesQuery = useRedditHotArticlesQuery(limit);
    const taiwaneseArticlesQuery = useRedditSubredditArticlesQuery('Taiwanese', limit);
    const chinaArticlesQuery = useRedditSubredditArticlesQuery('China_irl', limit);

    return {
        allArticlesQuery,
        taiwaneseArticlesQuery,
        chinaArticlesQuery,
    };
};

export default useAllRedditQuery;
