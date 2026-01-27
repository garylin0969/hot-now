/**
 * @fileoverview PTT 內容區塊元件
 */
import type { ComponentProps } from 'react';
import SectionTitle from '@/components/atoms/section-title';
import PttArticleCard from '@/components/molecules/ptt-article-card';
import { GetPttTrends } from '@/services/ptt-api';
import { cn } from '@/utils/shadcn';

/**
 * PTT 熱門文章內容區塊
 * 非同步 Server Component，負責獲取並顯示 PTT 全站熱門文章。
 *
 * @param props - 元件屬性
 * @returns 渲染後的 PTT 列表區塊
 */
const PttContent = async ({ className, ...props }: ComponentProps<'div'>) => {
    // 獲取 PTT 資料
    const pttResponse = await GetPttTrends();
    const pttArticles = pttResponse.articles || [];
    return (
        <div className={cn('w-full', className)} {...props}>
            <SectionTitle title="24H熱門文章" />
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {pttArticles?.map((article) => (
                    <PttArticleCard key={article.link} article={article} />
                ))}
            </div>
        </div>
    );
};

export default PttContent;
