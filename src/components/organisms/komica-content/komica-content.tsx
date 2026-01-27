/**
 * @fileoverview Komica (K島) 內容區塊元件
 */
import type { ComponentProps } from 'react';
import KomicaArticleCard from '@/components/molecules/komica-article-card';
import { GetKomicaTrends } from '@/services/komica-api';
import { cn } from '@/utils/shadcn';

/**
 * Komica 熱門文章內容區塊
 * 非同步 Server Component，負責獲取並顯示 K島綜合版的熱門討論串。
 *
 * @param props - 元件屬性
 * @returns 渲染後的 Komica 列表區塊
 */
const KomicaContent = async ({ className, ...props }: ComponentProps<'div'>) => {
    // 獲取 Komica 資料
    const komicaResponse = await GetKomicaTrends();
    const komicaTrends = komicaResponse.trends || [];

    return (
        <div className={cn('w-full', className)} {...props}>
            <div className="mx-auto max-w-xl space-y-3">
                {komicaTrends?.map((article) => (
                    <KomicaArticleCard key={article.link} article={article} />
                ))}
            </div>
        </div>
    );
};

export default KomicaContent;
