/**
 * @fileoverview BBC 內容區塊元件
 */
import { cacheLife } from 'next/cache';
import type { ComponentProps } from 'react';
import SectionTitle from '@/components/atoms/section-title';
import BbcArticleCard from '@/components/molecules/bbc-article-card';
import { GetBbcTrends } from '@/services/bbc-api';
import { cn } from '@/utils/shadcn';

/**
 * BBC 熱門新聞內容區塊
 * 非同步 Server Component，負責獲取並顯示 BBC 中文網的熱門文章。
 * 啟用 Next.js 'use cache' 與 cacheLife 進行快取管理。
 *
 * @param props - 元件屬性
 * @returns 渲染後的 BBC 內容區塊
 */
const BbcContent = async ({ className, ...props }: ComponentProps<'div'>) => {
    'use cache';
    cacheLife('halfHour');

    // 獲取 BBC 資料
    const bbcResponse = await GetBbcTrends();
    const bbcArticles = bbcResponse.trends || [];
    return (
        <div className={cn('w-full', className)} {...props}>
            <SectionTitle title="BBC中文新聞" />
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {bbcArticles?.map((article) => (
                    <BbcArticleCard key={article.guid} article={article} />
                ))}
            </div>
        </div>
    );
};

export default BbcContent;
