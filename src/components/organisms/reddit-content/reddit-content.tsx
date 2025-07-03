'use client';

import { useState, useMemo } from 'react';
import RedditArticleCard from '@/components/molecules/reddit-article-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { SimplifiedRedditArticle } from '@/types';

interface RedditContentProps {
    allArticles: SimplifiedRedditArticle[];
    taiwaneseArticles: SimplifiedRedditArticle[];
    chinaArticles: SimplifiedRedditArticle[];
}

type SubredditType = 'all' | 'taiwanese' | 'china_irl';

const SUBREDDIT_TABS = [
    { value: 'all', label: 'All' },
    { value: 'taiwanese', label: 'Taiwanese' },
    { value: 'china_irl', label: 'China_irl' },
] as const;

const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

const RedditContent = ({ allArticles, taiwaneseArticles, chinaArticles }: RedditContentProps) => {
    const [selectedSubreddit, setSelectedSubreddit] = useState<SubredditType>('all');

    const currentArticles = useMemo(() => {
        const articleMap = {
            all: allArticles,
            taiwanese: taiwaneseArticles,
            china_irl: chinaArticles,
        };
        return articleMap[selectedSubreddit];
    }, [selectedSubreddit, allArticles, taiwaneseArticles, chinaArticles]);

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
            {/* 文章列表 */}
            <div className="flex flex-col gap-4">
                {currentArticles?.map((article) => (
                    <RedditArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default RedditContent;
