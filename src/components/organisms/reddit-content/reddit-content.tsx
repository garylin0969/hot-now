'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { GetSimplifiedRedditHotArticles, GetSimplifiedRedditHotArticlesBySubreddit } from '@/api/reddit-api';
import RedditArticleCard from '@/components/molecules/reddit-article-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SubredditType = 'all' | 'taiwanese' | 'china_irl';

const SUBREDDIT_TABS = [
    { value: 'all', label: 'All' },
    { value: 'taiwanese', label: 'Taiwanese' },
    { value: 'china_irl', label: 'China_irl' },
] as const;

const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

const RedditContent = () => {
    const [selectedSubreddit, setSelectedSubreddit] = useState<SubredditType>('all');

    // 使用 React Query hooks 獲取資料
    const {
        data: allArticles,
        isLoading: isLoadingAll,
        error: errorAll,
    } = useQuery({
        queryKey: ['reddit', 'hot', 'all', 50],
        queryFn: () => GetSimplifiedRedditHotArticles(50),
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
    const {
        data: taiwaneseArticles,
        isLoading: isLoadingTaiwanese,
        error: errorTaiwanese,
    } = useQuery({
        queryKey: ['reddit', 'hot', 'taiwanese', 50],
        queryFn: () => GetSimplifiedRedditHotArticlesBySubreddit('Taiwanese', 50),
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
    const {
        data: chinaArticles,
        isLoading: isLoadingChina,
        error: errorChina,
    } = useQuery({
        queryKey: ['reddit', 'hot', 'china_irl', 50],
        queryFn: () => GetSimplifiedRedditHotArticlesBySubreddit('China_irl', 50),
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });

    const currentArticles = useMemo(() => {
        const articleMap = {
            all: allArticles || [],
            taiwanese: taiwaneseArticles || [],
            china_irl: chinaArticles || [],
        };
        return articleMap[selectedSubreddit];
    }, [selectedSubreddit, allArticles, taiwaneseArticles, chinaArticles]);

    const isLoading = useMemo(() => {
        const loadingMap = {
            all: isLoadingAll,
            taiwanese: isLoadingTaiwanese,
            china_irl: isLoadingChina,
        };
        return loadingMap[selectedSubreddit];
    }, [selectedSubreddit, isLoadingAll, isLoadingTaiwanese, isLoadingChina]);

    const error = useMemo(() => {
        const errorMap = {
            all: errorAll,
            taiwanese: errorTaiwanese,
            china_irl: errorChina,
        };
        return errorMap[selectedSubreddit];
    }, [selectedSubreddit, errorAll, errorTaiwanese, errorChina]);

    const handleSubredditChange = (value: string) => {
        setSelectedSubreddit(value as SubredditType);
    };

    return (
        <div className="mx-auto max-w-4xl">
            {/* Subreddit選擇器 */}
            <div className="mb-6">
                <Tabs value={selectedSubreddit} onValueChange={handleSubredditChange}>
                    <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
                        {SUBREDDIT_TABS.map(({ value, label }) => (
                            <TabsTrigger key={value} value={value} className={ACTIVE_TAB_CLASS}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* 載入狀態 */}
            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="text-muted-foreground">Loading...</div>
                </div>
            )}

            {/* 錯誤狀態 */}
            {error && (
                <div className="flex items-center justify-center py-8">
                    <div className="text-destructive">Error: {error.message}</div>
                </div>
            )}

            {/* 文章列表 */}
            {!isLoading && !error && (
                <div className="flex flex-col gap-4">
                    {currentArticles?.map((article) => (
                        <RedditArticleCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RedditContent;
