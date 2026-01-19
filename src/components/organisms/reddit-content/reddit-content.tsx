/**
 * @fileoverview Reddit 內容區塊元件
 */
import { cacheLife } from 'next/cache';
import type { ComponentProps } from 'react';
import RedditArticleCard from '@/components/molecules/reddit-article-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { REDDIT_SUBREDDITS, type RedditSubredditKey } from '@/constants/reddit';
import { GetSimplifiedRedditTrends } from '@/services/reddit-api';
import type { SimplifiedRedditArticle } from '@/types';
import { cn } from '@/utils/shadcn';

/** 頁籤樣式類名 */
const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

/**
 * Reddit 熱門文章內容區塊
 * 非同步 Server Component，負責獲取並顯示 Reddit 各子版塊 (Subreddit) 的熱門文章。
 * 支援動態載入多個子版塊資料。
 *
 * @param props - 元件屬性
 * @returns 渲染後的 Reddit 內容區塊
 */
const RedditContent = async ({ className, ...props }: ComponentProps<'div'>) => {
    'use cache';
    cacheLife('hours');

    // 取得所有子版塊鍵值
    const subredditKeys = Object.keys(REDDIT_SUBREDDITS) as RedditSubredditKey[];

    // 動態獲取所有 Reddit 爬蟲資料
    const results = await Promise.all(subredditKeys.map((key) => GetSimplifiedRedditTrends(key)));
    // 構建文章資料物件
    const articleData = subredditKeys.reduce(
        (acc, key, index) => {
            acc[key] = results[index];
            return acc;
        },
        {} as Record<RedditSubredditKey, SimplifiedRedditArticle[]>
    );

    // 渲染文章列表
    const renderArticleList = (articles: SimplifiedRedditArticle[], keyPrefix: string) => (
        <div className="flex flex-col gap-4">
            {articles?.map((article) => (
                <RedditArticleCard key={`${keyPrefix}-${article.id}`} article={article} />
            ))}
        </div>
    );

    return (
        <div className={cn('mx-auto max-w-4xl', className)} {...props}>
            <Tabs defaultValue={subredditKeys[0]}>
                {/* 子版塊選擇器 */}
                <div className="mb-6">
                    <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
                        {subredditKeys.map((key) => (
                            <TabsTrigger key={key} value={key} className={ACTIVE_TAB_CLASS}>
                                {REDDIT_SUBREDDITS[key].label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* 動態渲染所有類別的內容 */}
                {subredditKeys.map((key) => (
                    <TabsContent key={key} value={key}>
                        {renderArticleList(articleData[key], key)}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default RedditContent;
