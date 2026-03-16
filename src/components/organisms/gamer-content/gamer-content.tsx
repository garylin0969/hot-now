/**
 * @fileoverview 巴哈姆特 (Gamer) 內容區塊元件
 */
import type { ComponentProps } from 'react';
import GamerArticleCard from '@/components/molecules/gamer-article-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GAMER_CATEGORIES, type GamerCategoryKey } from '@/constants/gamer';
import type { GamerTrend, HomePageData } from '@/types';
import { cn } from '@/utils/shadcn';

/** 頁籤樣式類名 */
const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

/** 巴哈姆特內容區塊元件屬性。 */
interface GamerContentProps extends ComponentProps<'div'> {
    /** 首頁聚合後的巴哈姆特分類資料。 */
    trendsByCategory: HomePageData['gamer'];
}

/**
 * 巴哈姆特熱門文章內容區塊
 * 展示型元件，負責顯示巴哈姆特各分類的熱門文章。
 * 包含全站、遊戲、動漫、生活等分類標籤頁。
 *
 * @param props - 元件屬性
 * @param props.trendsByCategory - 巴哈姆特各分類文章資料
 * @returns 渲染後的 Gamer 內容區塊
 */
const GamerContent = ({ className, trendsByCategory, ...props }: GamerContentProps) => {
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
                        {renderArticleList(trendsByCategory[key], key)}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default GamerContent;
