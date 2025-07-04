'use client';

import { useState, useMemo } from 'react';
import GamerArticleCard from '@/components/molecules/gamer-article-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { GamerTrend } from '@/types';

interface GamerContentProps {
    allTrends: GamerTrend[];
    gameTrends: GamerTrend[];
    acTrends: GamerTrend[];
    lifeTrends: GamerTrend[];
}

type CategoryType = 'all' | 'game' | 'ac' | 'life';

const CATEGORY_TABS = [
    { value: 'all', label: '全部' },
    { value: 'game', label: '遊戲' },
    { value: 'ac', label: '動漫' },
    { value: 'life', label: '宅生活' },
] as const;

const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

const GamerContent = ({ allTrends, gameTrends, acTrends, lifeTrends }: GamerContentProps) => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

    const currentTrends = useMemo(() => {
        const trendMap = {
            all: allTrends,
            game: gameTrends,
            ac: acTrends,
            life: lifeTrends,
        };
        return trendMap[selectedCategory] || [];
    }, [selectedCategory, allTrends, gameTrends, acTrends, lifeTrends]);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value as CategoryType);
    };

    return (
        <div className="w-full">
            {/* 類別選擇器 */}
            <div className="mb-6">
                <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
                    <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-4">
                        {CATEGORY_TABS.map(({ value, label }) => (
                            <TabsTrigger key={value} value={value} className={`text-sm ${ACTIVE_TAB_CLASS}`}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* 文章列表 */}
            <div className="mx-auto flex max-w-4xl flex-col gap-4">
                {currentTrends?.map((article) => (
                    <GamerArticleCard key={`${article.bsn}-${article.snA}`} article={article} />
                ))}
            </div>
        </div>
    );
};

export default GamerContent;
