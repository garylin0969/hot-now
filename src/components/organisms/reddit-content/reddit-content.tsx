import RedditArticleCard from '@/components/molecules/reddit-article-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { SimplifiedRedditArticle } from '@/types';
import { cn } from '@/utils/shadcn';

// 子版塊頁籤資料
const SUBREDDIT_TABS = [
    { value: 'all', label: 'All' },
    { value: 'taiwanese', label: 'Taiwanese' },
    { value: 'china_irl', label: 'China_irl' },
] as const;

// 頁籤樣式
const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

interface RedditContentProps {
    className?: string;
    allArticles: SimplifiedRedditArticle[];
    taiwaneseArticles: SimplifiedRedditArticle[];
    chinaIrlArticles: SimplifiedRedditArticle[];
}

const RedditContent = ({ className, allArticles, taiwaneseArticles, chinaIrlArticles }: RedditContentProps) => {
    // 文章資料
    const articleData = {
        all: allArticles,
        taiwanese: taiwaneseArticles,
        china_irl: chinaIrlArticles,
    };

    // 渲染文章列表
    const renderArticleList = (articles: SimplifiedRedditArticle[], keyPrefix: string) => (
        <div className="flex flex-col gap-4">
            {articles?.map((article) => (
                <RedditArticleCard key={`${keyPrefix}-${article.id}`} article={article} />
            ))}
        </div>
    );

    return (
        <div className={cn('mx-auto max-w-4xl', className)}>
            <Tabs defaultValue={SUBREDDIT_TABS[0]?.value}>
                {/* 子版塊選擇器 */}
                <div className="mb-6">
                    <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
                        {SUBREDDIT_TABS.map(({ value, label }) => (
                            <TabsTrigger key={value} value={value} className={ACTIVE_TAB_CLASS}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* 動態渲染所有類別的內容 */}
                {SUBREDDIT_TABS.map(({ value }) => (
                    <TabsContent key={value} value={value}>
                        {renderArticleList(articleData[value], value)}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default RedditContent;
