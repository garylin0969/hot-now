'use client';

import { useQuery } from '@tanstack/react-query';
import { GetSimplifiedRedditHotArticles } from '@/api/reddit-api';

// 獲取所有Reddit熱門文章
const useRedditHotArticlesQuery = (limit: number = 50) => {
    const query = useQuery({
        queryKey: ['reddit', 'hot', 'all', limit],
        queryFn: () => GetSimplifiedRedditHotArticles(limit),
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });

    return query;
};

export default useRedditHotArticlesQuery;
