/**
 * @fileoverview 巴哈姆特 (Gamer) 內容區塊元件
 */
import type { ComponentProps } from 'react';
import GamerArticleCard from '@/components/molecules/gamer-article-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GAMER_CATEGORIES, type GamerCategoryKey } from '@/constants/gamer';
import { GetGamerTrends } from '@/services/gamer-api';
import type { GamerTrend } from '@/types';
import { cn } from '@/utils/shadcn';

/** 頁籤樣式類名 */
const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

/**
 * 巴哈姆特熱門文章內容區塊
 * 非同步 Server Component，負責獲取並顯示巴哈姆特各分類的熱門文章。
 * 包含全站、遊戲、動漫、生活等分類標籤頁。
 *
 * @param props - 元件屬性
 * @returns 渲染後的 Gamer 內容區塊
 */
const GamerContent = async ({ className, ...props }: ComponentProps<'div'>) => {
    // 獲取所有分類資料
    const gamerResponse = await GetGamerTrends();
    const allTrends = gamerResponse.data?.all || [];

    const gameTrends = gamerResponse.data?.game || [];
    const acTrends = gamerResponse.data?.ac || [];
    const lifeTrends = gamerResponse.data?.life || [];

    // 趨勢資料
    const trendData = {
        all: allTrends,
        game: gameTrends,
        ac: acTrends,
        life: lifeTrends,
    };

    // 取得所有類別鍵值
    const categoryKeys = Object.keys(GAMER_CATEGORIES) as GamerCategoryKey[];

    // 渲染文章列表
    const renderArticleList = (trends: GamerTrend[], keyPrefix: string) => (
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
            {trends?.map((article) => (
                <GamerArticleCard key={`${keyPrefix}-${article.bsn}-${article.snA}`} article={article} />
            ))}
        </div>
    );

    return (
        <div className={cn('w-full', className)} {...props}>
            <Tabs defaultValue={categoryKeys[0]}>
                {/* 類別選擇器 */}
                <div className="mb-6">
                    <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-4">
                        {categoryKeys.map((key) => (
                            <TabsTrigger key={key} value={key} className={cn('text-sm', ACTIVE_TAB_CLASS)}>
                                {GAMER_CATEGORIES[key].label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* 動態渲染所有類別的內容 */}
                {categoryKeys.map((key) => (
                    <TabsContent key={key} value={key}>
                        {renderArticleList(trendData[key], key)}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default GamerContent;
