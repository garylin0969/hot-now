// ========== 原本的 Client-side Reddit Prefetch 組件 (註解但保留) ==========
// 注意：已改用 server-side 資料獲取，避免 403 和 429 錯誤

/*
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { GetSimplifiedRedditHotArticles, GetSimplifiedRedditHotArticlesBySubreddit } from '@/api/reddit-api';

// Reddit 資料預載組件
const RedditPrefetch = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        // 預載 Reddit 資料
        const prefetchRedditData = async () => {
            const limit = 50;

            // 預載所有 Reddit 熱門文章
            queryClient.prefetchQuery({
                queryKey: ['reddit', 'hot', 'all', limit],
                queryFn: () => GetSimplifiedRedditHotArticles(limit),
                staleTime: 30 * 60 * 1000, // 30 minutes
            });

            // 預載 Taiwanese 子版塊
            queryClient.prefetchQuery({
                queryKey: ['reddit', 'hot', 'Taiwanese', limit],
                queryFn: () => GetSimplifiedRedditHotArticlesBySubreddit('Taiwanese', limit),
                staleTime: 30 * 60 * 1000, // 30 minutes
            });

            // 預載 China_irl 子版塊
            queryClient.prefetchQuery({
                queryKey: ['reddit', 'hot', 'China_irl', limit],
                queryFn: () => GetSimplifiedRedditHotArticlesBySubreddit('China_irl', limit),
                staleTime: 30 * 60 * 1000, // 30 minutes
            });
        };

        prefetchRedditData();
    }, [queryClient]);

    return null; // 這是一個不渲染任何內容的組件
};

export default RedditPrefetch;
*/

// 暫時匯出空的組件，避免 import 錯誤
const RedditPrefetch = () => {
    return null;
};

export default RedditPrefetch;
