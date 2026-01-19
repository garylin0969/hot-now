import BaseImage from '@/components/atoms/base-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { GamerTrend } from '@/types';
import { formatCompactNumber } from '@/utils/number';
import { cn } from '@/utils/shadcn';

/**
 * 構造巴哈姆特文章連結
 *
 * @param bsn - 看板編號
 * @param snA - 文章編號
 * @returns 完整的文章 URL
 */
const buildGamerLink = (bsn: number, snA: number): string => {
    return `https://forum.gamer.com.tw/C.php?bsn=${bsn}&snA=${snA}`;
};

/**
 * Gamer 文章卡片元件的屬性介面
 */
interface GamerArticleCardProps {
    /** Gamer 文章趨勢資料 */
    article: GamerTrend;
}

/**
 * 顯示巴哈姆特熱門文章的卡片元件
 *
 * @param props - 元件屬性
 * @param props.article - 文章資料
 * @returns 渲染後的文章卡片
 */
const GamerArticleCard = ({ article }: GamerArticleCardProps) => {
    // 樣式類名
    const cardHeightClasses = 'h-[120px] sm:h-[140px]';
    const textMutedClasses = 'text-muted-foreground text-xs';
    const badgeTextClasses = 'text-xs';

    const articleLink = buildGamerLink(article.bsn, article.snA);

    return (
        <a href={articleLink} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <div className={cn('flex flex-row', cardHeightClasses)}>
                    <div className="relative hidden w-24 shrink-0 overflow-hidden md:block md:w-40 lg:w-48">
                        <BaseImage
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            src={article.thumbnail}
                            alt={`${article.title} image`}
                            fill
                        />
                    </div>

                    <CardContent className={cn('flex flex-1 flex-col justify-between p-3 sm:p-4', cardHeightClasses)}>
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-x-1 sm:gap-x-2">
                                <Badge variant="secondary" className={badgeTextClasses}>
                                    {article.name}
                                </Badge>
                                <span>|</span>
                                <Badge variant="outline" className={badgeTextClasses}>
                                    {article.subbtitle}
                                </Badge>
                            </div>
                            <div className="group-hover:text-primary line-clamp-1 text-sm font-semibold transition-colors sm:text-base lg:text-lg">
                                {article.title}
                            </div>
                            <p className="text-muted-foreground line-clamp-1 text-xs">{article.summary}</p>
                        </div>
                        <div className={cn('mt-2 flex items-center gap-2 sm:gap-4 sm:text-sm', textMutedClasses)}>
                            <div className="flex items-center gap-1">
                                <span>👍</span>
                                <span>{article.interaction.gp}</span>
                            </div>
                            {article.interaction.bp !== '-' && (
                                <div className="flex items-center gap-1">
                                    <span>👎</span>
                                    <span>{article.interaction.bp}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <span>💬</span>
                                <span className="hidden sm:inline">
                                    {formatCompactNumber(article.interaction.others)} 留言
                                </span>
                                <span className="sm:hidden">{formatCompactNumber(article.interaction.others)}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </a>
    );
};

export default GamerArticleCard;
