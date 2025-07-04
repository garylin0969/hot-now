'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { GetSimplifiedRedditHotArticles, GetSimplifiedRedditHotArticlesBySubreddit } from '@/api/reddit-api';
import StatusDisplay from '@/components/atoms/status-display';
import RedditArticleCard from '@/components/molecules/reddit-article-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/utils/shadcn';

// 子版塊類型
type SubredditType = 'all' | 'taiwanese' | 'china_irl';

// 子版塊頁籤資料
const SUBREDDIT_TABS = [
    { value: 'all', label: 'All' },
    { value: 'taiwanese', label: 'Taiwanese' },
    { value: 'china_irl', label: 'China_irl' },
] as const;

// 頁籤樣式
const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

const RedditContent = ({ className }: { className?: string }) => {
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

    // 當前文章
    const currentArticles = useMemo(() => {
        const articleMap = {
            all: allArticles || [],
            taiwanese: taiwaneseArticles || [],
            china_irl: chinaArticles || [],
        };
        return articleMap[selectedSubreddit];
    }, [selectedSubreddit, allArticles, taiwaneseArticles, chinaArticles]);

    // 是否加載中
    const isLoading = useMemo(() => {
        const loadingMap = {
            all: isLoadingAll,
            taiwanese: isLoadingTaiwanese,
            china_irl: isLoadingChina,
        };
        return loadingMap[selectedSubreddit];
    }, [selectedSubreddit, isLoadingAll, isLoadingTaiwanese, isLoadingChina]);

    // 錯誤
    const error = useMemo(() => {
        const errorMap = {
            all: errorAll,
            taiwanese: errorTaiwanese,
            china_irl: errorChina,
        };
        return errorMap[selectedSubreddit];
    }, [selectedSubreddit, errorAll, errorTaiwanese, errorChina]);

    // 子版塊選擇器
    const handleSubredditChange = (value: string) => {
        setSelectedSubreddit(value as SubredditType);
    };

    return (
        <div className={cn('mx-auto max-w-4xl', className)}>
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

            {/* 狀態顯示：Loading、Error */}
            <StatusDisplay isLoading={isLoading} error={error} />

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
