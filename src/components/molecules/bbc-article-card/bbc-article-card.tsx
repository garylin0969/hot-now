import NativeImage from '@/components/atoms/native-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { BbcArticle } from '@/types';
import { cn } from '@/utils/shadcn';

// 樣式常量
const STYLES = {
    cardHeight: 'h-[120px] sm:h-[140px]',
    textMuted: 'text-muted-foreground text-xs',
    badgeText: 'text-xs',
} as const;

// 格式化發布時間為 yyyy/mm/dd hh:mm
const formatPublishedTime = (pubDate: string): string => {
    try {
        const published = new Date(pubDate);
        const year = published.getFullYear();
        const month = String(published.getMonth() + 1).padStart(2, '0');
        const day = String(published.getDate()).padStart(2, '0');
        const hours = String(published.getHours()).padStart(2, '0');
        const minutes = String(published.getMinutes()).padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}`;
    } catch {
        return pubDate;
    }
};

interface BbcArticleCardProps {
    article: BbcArticle;
}

const BbcArticleCard = ({ article }: BbcArticleCardProps) => {
    const formattedTime = formatPublishedTime(article.pubDate);

    return (
        <a href={article.link} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <div className={cn('flex flex-row', STYLES.cardHeight)}>
                    <div className="relative hidden w-24 flex-shrink-0 overflow-hidden md:block md:w-40 lg:w-48">
                        <NativeImage
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            src={article.thumbnail}
                            alt={article.title}
                            loading="lazy"
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
                            <h3 className="group-hover:text-primary line-clamp-1 text-sm leading-tight font-semibold transition-colors sm:text-base lg:text-lg">
                                {article.title}
                            </h3>
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
