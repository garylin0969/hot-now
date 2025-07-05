// ========== 原本的 Client-side Reddit Query Hook (註解但保留) ==========
// 注意：已改用 server-side 資料獲取，避免 403 和 429 錯誤

/*
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
*/

// 暫時匯出空的 hook，避免 import 錯誤
const useAllRedditQuery = () => {
    return {
        allArticlesQuery: null,
        taiwaneseArticlesQuery: null,
        chinaArticlesQuery: null,
    };
};

export default useAllRedditQuery;
