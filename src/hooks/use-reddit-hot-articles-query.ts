// ========== 原本的 Client-side Reddit Query Hook (註解但保留) ==========
// 注意：已改用 server-side 資料獲取，避免 403 和 429 錯誤

/*
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
*/

// 暫時匯出空的 hook，避免 import 錯誤
const useRedditHotArticlesQuery = () => {
    return null;
};

export default useRedditHotArticlesQuery;
