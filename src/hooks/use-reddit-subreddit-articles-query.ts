// ========== 原本的 Client-side Reddit Query Hook (註解但保留) ==========
// 注意：已改用 server-side 資料獲取，避免 403 和 429 錯誤

/*
'use client';

import { useQuery } from '@tanstack/react-query';
import { GetSimplifiedRedditHotArticlesBySubreddit } from '@/api/reddit-api';

// 獲取特定子版塊文章的 hook
const useRedditSubredditArticlesQuery = (subreddit: string, limit: number = 50) => {
    const query = useQuery({
        queryKey: ['reddit', 'hot', subreddit, limit],
        queryFn: () => GetSimplifiedRedditHotArticlesBySubreddit(subreddit, limit),
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });

    return query;
};

export default useRedditSubredditArticlesQuery;
*/

// 暫時匯出空的 hook，避免 import 錯誤
const useRedditSubredditArticlesQuery = () => {
    return null;
};

export default useRedditSubredditArticlesQuery;
