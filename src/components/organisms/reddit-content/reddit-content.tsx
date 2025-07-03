'use client';

import { useState } from 'react';
import RedditArticleCard from '@/components/molecules/reddit-article-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { SimplifiedRedditArticle } from '@/types';

interface RedditContentProps {
    allArticles: SimplifiedRedditArticle[];
    taiwaneseArticles: SimplifiedRedditArticle[];
    chinaArticles: SimplifiedRedditArticle[];
}

const RedditContent = ({ allArticles, taiwaneseArticles, chinaArticles }: RedditContentProps) => {
    const [selectedSubreddit, setSelectedSubreddit] = useState<'all' | 'taiwanese' | 'china_irl'>('all');

    const getCurrentArticles = () => {
        switch (selectedSubreddit) {
            case 'taiwanese':
                return taiwaneseArticles;
            case 'china_irl':
                return chinaArticles;
            default:
                return allArticles;
        }
    };

    return (
        <div className="mx-auto max-w-4xl">
            {/* Subreddit選擇器 */}
            <div className="mb-6">
                <Tabs
                    value={selectedSubreddit}
                    onValueChange={(value) => setSelectedSubreddit(value as typeof selectedSubreddit)}
                >
                    <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="taiwanese"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            Taiwanese
                        </TabsTrigger>
                        <TabsTrigger
                            value="china_irl"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            China_irl
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            {/* 文章列表 */}
            <div className="flex flex-col gap-4">
                {getCurrentArticles()?.map((article) => (
                    <RedditArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default RedditContent;
