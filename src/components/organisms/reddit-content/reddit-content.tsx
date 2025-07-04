'use client';

import { useState, useMemo } from 'react';
import StatusDisplay from '@/components/atoms/status-display';
import RedditArticleCard from '@/components/molecules/reddit-article-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAllRedditQuery } from '@/hooks';
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

    // 使用自定義 hooks 獲取所有 Reddit 查詢
    const { allArticlesQuery, taiwaneseArticlesQuery, chinaArticlesQuery } = useAllRedditQuery(50);

    // 當前文章
    const currentArticles = useMemo(() => {
        const articleMap = {
            all: allArticlesQuery.data || [],
            taiwanese: taiwaneseArticlesQuery.data || [],
            china_irl: chinaArticlesQuery.data || [],
        };
        return articleMap[selectedSubreddit];
    }, [selectedSubreddit, allArticlesQuery.data, taiwaneseArticlesQuery.data, chinaArticlesQuery.data]);

    // 是否加載中
    const isLoading = useMemo(() => {
        const loadingMap = {
            all: allArticlesQuery.isLoading,
            taiwanese: taiwaneseArticlesQuery.isLoading,
            china_irl: chinaArticlesQuery.isLoading,
        };
        return loadingMap[selectedSubreddit];
    }, [selectedSubreddit, allArticlesQuery.isLoading, taiwaneseArticlesQuery.isLoading, chinaArticlesQuery.isLoading]);

    // 錯誤
    const error = useMemo(() => {
        const errorMap = {
            all: allArticlesQuery.error,
            taiwanese: taiwaneseArticlesQuery.error,
            china_irl: chinaArticlesQuery.error,
        };
        return errorMap[selectedSubreddit];
    }, [selectedSubreddit, allArticlesQuery.error, taiwaneseArticlesQuery.error, chinaArticlesQuery.error]);

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
