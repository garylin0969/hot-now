import GamerArticleCard from '@/components/molecules/gamer-article-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { GamerTrend } from '@/types';
import { cn } from '@/utils/shadcn';

// 類別頁籤資料
const CATEGORY_TABS = [
    { value: 'all', label: '全部' },
    { value: 'game', label: '遊戲' },
    { value: 'ac', label: '動漫' },
    { value: 'life', label: '宅生活' },
] as const;

// 頁籤樣式
const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

interface GamerContentProps {
    className?: string;
    allTrends: GamerTrend[];
    gameTrends: GamerTrend[];
    acTrends: GamerTrend[];
    lifeTrends: GamerTrend[];
}

const GamerContent = ({ className, allTrends, gameTrends, acTrends, lifeTrends }: GamerContentProps) => {
    // 趨勢資料
    const trendData = {
        all: allTrends,
        game: gameTrends,
        ac: acTrends,
        life: lifeTrends,
    };

    // 渲染文章列表
    const renderArticleList = (trends: GamerTrend[], keyPrefix: string) => (
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
            {trends?.map((article) => (
                <GamerArticleCard key={`${keyPrefix}-${article.bsn}-${article.snA}`} article={article} />
            ))}
        </div>
    );

    return (
        <div className={cn('w-full', className)}>
            <Tabs defaultValue={CATEGORY_TABS[0]?.value}>
                {/* 類別選擇器 */}
                <div className="mb-6">
                    <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-4">
                        {CATEGORY_TABS?.map(({ value, label }) => (
                            <TabsTrigger key={value} value={value} className={cn('text-sm', ACTIVE_TAB_CLASS)}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* 動態渲染所有類別的內容 */}
                {CATEGORY_TABS?.map(({ value }) => (
                    <TabsContent key={value} value={value}>
                        {renderArticleList(trendData[value], value)}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default GamerContent;
