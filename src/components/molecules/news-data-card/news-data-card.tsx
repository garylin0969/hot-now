import NativeImage from '@/components/atoms/native-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { SimplifiedNews } from '@/types';
import { cn } from '@/utils/shadcn';

// 格式化發布時間
const formatPublishedTime = (pubDate: string): string => {
    const now = new Date();
    const published = new Date(pubDate);
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);

    const TIME_CONSTANTS = {
        MINUTE: 60,
        HOUR: 3600,
        DAY: 86400,
        MONTH: 86400 * 30,
    };

    if (diffInSeconds < TIME_CONSTANTS.HOUR) {
        const minutes = Math.floor(diffInSeconds / TIME_CONSTANTS.MINUTE);
        return `${minutes} 分鐘前`;
    } else if (diffInSeconds < TIME_CONSTANTS.DAY) {
        const hours = Math.floor(diffInSeconds / TIME_CONSTANTS.HOUR);
        return `${hours} 小時前`;
    } else if (diffInSeconds < TIME_CONSTANTS.MONTH) {
        const days = Math.floor(diffInSeconds / TIME_CONSTANTS.DAY);
        return `${days} 天前`;
    } else {
        const months = Math.floor(diffInSeconds / TIME_CONSTANTS.MONTH);
        return `${months} 個月前`;
    }
};

interface NewsDataCardProps {
    news: SimplifiedNews;
}

const NewsDataCard = ({ news }: NewsDataCardProps) => {
    // 提取重複的樣式類名
    const cardHeightClasses = 'h-[120px] sm:h-[140px]';
    const textMutedClasses = 'text-muted-foreground text-xs';
    const badgeTextClasses = 'text-xs';

    return (
        <a href={news.link} target="_blank" rel="noopener noreferrer">
            <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <div className={cn('flex flex-row', cardHeightClasses)}>
                    {news.image_url && (
                        <div className="relative w-24 flex-shrink-0 sm:w-32 md:w-40 lg:w-48">
                            <NativeImage
                                className="h-full w-full object-cover"
                                src={news.image_url}
                                alt={news.title}
                                loading="lazy"
                            />
                        </div>
                    )}
                    <CardContent className={cn('flex flex-1 flex-col justify-between p-3 sm:p-4', cardHeightClasses)}>
                        <div>
                            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
                                <div className="flex items-center gap-1">
                                    {news.source_icon && (
                                        <NativeImage
                                            className="h-4 w-4 rounded-sm object-cover"
                                            src={news.source_icon}
                                            alt={news.source_name}
                                            loading="lazy"
                                        />
                                    )}
                                    <Badge variant="secondary" className={badgeTextClasses}>
                                        {news.source_name}
                                    </Badge>
                                </div>
                                {news.category.length > 0 && (
                                    <Badge variant="outline" className={badgeTextClasses}>
                                        {news.category[0]}
                                    </Badge>
                                )}
                                <span className={textMutedClasses}>{formatPublishedTime(news.pubDate)}</span>
                            </div>
                            <h3 className="hover:text-primary line-clamp-2 text-sm leading-tight font-semibold transition-colors sm:text-base lg:text-lg">
                                {news.title}
                            </h3>
                        </div>
                        {news.description && (
                            <p className={cn('mt-2 line-clamp-2 text-xs sm:text-sm', textMutedClasses)}>
                                {news.description}
                            </p>
                        )}
                    </CardContent>
                </div>
            </Card>
        </a>
    );
};

export default NewsDataCard;
