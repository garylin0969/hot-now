import NativeImage from '@/components/atoms/native-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { GamerTrend } from '@/types';
import { cn } from '@/utils/shadcn';

// 通用數字格式化函數
const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    } else {
        return num.toString();
    }
};

interface GamerArticleCardProps {
    article: GamerTrend;
}

const GamerArticleCard = ({ article }: GamerArticleCardProps) => {
    // 提取重複的樣式類名
    const cardHeightClasses = 'h-[120px] sm:h-[140px]';
    const textMutedClasses = 'text-muted-foreground text-xs';
    const badgeTextClasses = 'text-xs';

    return (
        <a href={article.link} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <div className={cn('flex flex-row', cardHeightClasses)}>
                    {article.articleImage && (
                        <div className="relative w-24 flex-shrink-0 overflow-hidden sm:w-32 md:w-40 lg:w-48">
                            <NativeImage
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                src={article.articleImage}
                                alt={article.title}
                                loading="lazy"
                            />
                        </div>
                    )}
                    <CardContent className={cn('flex flex-1 flex-col justify-between p-3 sm:p-4', cardHeightClasses)}>
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                <Badge variant="secondary" className={badgeTextClasses}>
                                    {article.boardName}
                                </Badge>
                                <span>|</span>
                                <Badge variant="outline" className={badgeTextClasses}>
                                    {article.subBoard}
                                </Badge>
                            </div>
                            <h3 className="group-hover:text-primary line-clamp-1 text-sm font-semibold transition-colors sm:text-base lg:text-lg">
                                {article.title}
                            </h3>
                            <p className="text-muted-foreground line-clamp-1 text-xs">{article.content}</p>
                        </div>
                        <div className={cn('mt-2 flex items-center gap-2 sm:gap-4 sm:text-sm', textMutedClasses)}>
                            <div className="flex items-center gap-1">
                                <span>👍</span>
                                <span>{formatNumber(article.gp)}</span>
                            </div>
                            {article.bp > 0 && (
                                <div className="flex items-center gap-1">
                                    <span>👎</span>
                                    <span>{formatNumber(article.bp)}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <span>💬</span>
                                <span className="hidden sm:inline">{formatNumber(article.comments)} 留言</span>
                                <span className="sm:hidden">{formatNumber(article.comments)}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </a>
    );
};

export default GamerArticleCard;
