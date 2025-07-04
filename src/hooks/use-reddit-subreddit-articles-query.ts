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
