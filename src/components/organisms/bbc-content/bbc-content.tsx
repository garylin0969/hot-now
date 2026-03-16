/**
 * @fileoverview BBC 內容區塊元件
 */
import type { ComponentProps } from 'react';
import SectionTitle from '@/components/atoms/section-title';
import BbcArticleCard from '@/components/molecules/bbc-article-card';
import type { HomePageData } from '@/types';
import { cn } from '@/utils/shadcn';

/** BBC 內容區塊元件屬性。 */
interface BbcContentProps extends ComponentProps<'div'> {
    /** 首頁聚合後的 BBC 文章列表。 */
    articles: HomePageData['bbc'];
}

/**
 * BBC 熱門新聞內容區塊
 * 展示型元件，負責顯示 BBC 中文網的熱門文章。
 *
 *
 * @param props - 元件屬性
 * @param props.articles - BBC 文章資料
 * @returns 渲染後的 BBC 內容區塊
 */
const BbcContent = ({ className, articles, ...props }: BbcContentProps) => {
    return (
        <div className={cn('w-full', className)} {...props}>
            <SectionTitle title="BBC中文新聞" />
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {articles?.map((article) => (
                    <BbcArticleCard key={article.guid} article={article} />
                ))}
            </div>
        </div>
    );
};

export default BbcContent;
