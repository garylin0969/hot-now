'use client';

import { useState, useMemo } from 'react';
import { useRedditHotArticles, useRedditHotArticlesBySubreddit } from '@/api/reddit-api';
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

    // 使用 React Query hooks 获取数据
    const { data: allArticles, isLoading: isLoadingAll, error: errorAll } = useRedditHotArticles(50);
    const {
        data: taiwaneseArticles,
        isLoading: isLoadingTaiwanese,
        error: errorTaiwanese,
    } = useRedditHotArticlesBySubreddit('Taiwanese', 50);
    const {
        data: chinaArticles,
        isLoading: isLoadingChina,
        error: errorChina,
    } = useRedditHotArticlesBySubreddit('China_irl', 50);

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

            {/* 载入状态 */}
            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="text-muted-foreground">Loading...</div>
                </div>
            )}

            {/* 错误状态 */}
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
