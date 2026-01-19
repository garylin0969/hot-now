/**
 * @fileoverview Komica 文章卡片元件
 */
import { Badge } from '@/components/ui/badge';
import type { KomicaTrend } from '@/types';

/** Komica 文章卡片屬性介面 */
interface KomicaArticleCardProps {
    /** Komica 文章資料 */
    article: KomicaTrend;
}

/**
 * 顯示 Komica 熱門文章的單一項目元件
 *
 * @param props - 元件屬性
 * @param props.article - 文章資料
 * @returns 渲染後的文章卡片 (列表項目樣式)
 */
const KomicaArticleCard = ({ article }: KomicaArticleCardProps) => {
    return (
        <a
            href={article.link}
            className="group block border-b pb-3 last:border-b-0"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="flex items-start gap-3">
                <Badge variant="secondary">{article.replyCount} 回應</Badge>
                <div className="flex-1">
                    <div className="group-hover:text-primary line-clamp-1 font-semibold">{article.title}</div>
                    <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">{article.description}...</p>
                    <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                        <span>{article.date}</span>
                        <span>{article.time}</span>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default KomicaArticleCard;
