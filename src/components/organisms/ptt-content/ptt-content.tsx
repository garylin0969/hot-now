/**
 * @fileoverview PTT 內容區塊元件
 */
import type { ComponentProps } from 'react';
import SectionTitle from '@/components/atoms/section-title';
import PttArticleCard from '@/components/molecules/ptt-article-card';
import type { HomePageData } from '@/types';
import { cn } from '@/utils/shadcn';

/** PTT 內容區塊元件屬性。 */
interface PttContentProps extends ComponentProps<'div'> {
    /** 首頁聚合後的 PTT 文章列表。 */
    articles: HomePageData['ptt'];
}

/**
 * PTT 熱門文章內容區塊
 * 展示型元件，負責顯示 PTT 全站熱門文章。
 *
 * @param props - 元件屬性
 * @param props.articles - PTT 文章資料
 * @returns 渲染後的 PTT 列表區塊
 */
const PttContent = ({ className, articles, ...props }: PttContentProps) => {
    return (
        <div className={cn('w-full', className)} {...props}>
            <SectionTitle title="24H熱門文章" />
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {articles?.map((article) => (
                    <PttArticleCard key={article.link} article={article} />
                ))}
            </div>
        </div>
    );
};

export default PttContent;
