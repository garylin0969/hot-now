/**
 * @fileoverview Komica (K島) 內容區塊元件
 */
import type { ComponentProps } from 'react';
import KomicaArticleCard from '@/components/molecules/komica-article-card';
import type { HomePageData } from '@/types';
import { cn } from '@/utils/shadcn';

/** Komica 內容區塊元件屬性。 */
interface KomicaContentProps extends ComponentProps<'div'> {
    /** 首頁聚合後的 Komica 文章列表。 */
    articles: HomePageData['komica'];
}

/**
 * Komica 熱門文章內容區塊
 * 展示型元件，負責顯示 K島綜合版的熱門討論串。
 *
 * @param props - 元件屬性
 * @param props.articles - Komica 文章資料
 * @returns 渲染後的 Komica 列表區塊
 */
const KomicaContent = ({ className, articles, ...props }: KomicaContentProps) => {
    return (
        <div className={cn('w-full', className)} {...props}>
            <div className="mx-auto max-w-xl space-y-3">
                {articles?.map((article) => (
                    <KomicaArticleCard key={article.link} article={article} />
                ))}
            </div>
        </div>
    );
};

export default KomicaContent;
