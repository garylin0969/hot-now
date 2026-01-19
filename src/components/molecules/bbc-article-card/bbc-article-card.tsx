import BaseImage from '@/components/atoms/base-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { BbcArticle } from '@/types';
import { formatDateTime } from '@/utils/date';
import { cn } from '@/utils/shadcn';

/** 樣式常量 */
const STYLES = {
    cardHeight: 'h-[120px] sm:h-[140px]',
    textMuted: 'text-muted-foreground text-xs',
    badgeText: 'text-xs',
} as const;

/**
 * BBC 文章卡片元件的屬性介面
 */
interface BbcArticleCardProps {
    /** BBC 文章資料物件 */
    article: BbcArticle;
}

/**
 * 顯示 BBC 新聞文章的卡片元件
 *
 * @param props - 元件屬性
 * @param props.article - BBC 文章資料
 * @returns 渲染後的文章卡片
 */
const BbcArticleCard = ({ article }: BbcArticleCardProps) => {
    const formattedTime = formatDateTime(article.pubDate);

    return (
        <a href={article.link} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <div className={cn('flex flex-row', STYLES.cardHeight)}>
                    <div className="relative hidden w-24 shrink-0 overflow-hidden md:block md:w-40 lg:w-48">
                        <BaseImage
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            src={article.thumbnail}
                            alt={`${article.title} image`}
                            fill
                        />
                    </div>
                    <CardContent className={cn('flex flex-1 flex-col space-y-2 p-3 sm:p-4', STYLES.cardHeight)}>
                        <div>
                            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
                                <Badge variant="secondary" className={STYLES.badgeText}>
                                    BBC
                                </Badge>
                                <span className={STYLES.textMuted}>{formattedTime}</span>
                            </div>
                            <div className="group-hover:text-primary line-clamp-1 text-sm leading-tight font-semibold transition-colors sm:text-base lg:text-lg">
                                {article.title}
                            </div>
                        </div>
                        <div>
                            <p className={cn('line-clamp-2 text-xs sm:text-sm', STYLES.textMuted)}>
                                {article.description}
                            </p>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </a>
    );
};

export default BbcArticleCard;
