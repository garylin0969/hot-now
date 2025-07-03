import NativeImage from '@/components/atoms/native-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { SimplifiedRedditArticle } from '@/types';
import { cn } from '@/utils/shadcn';

// 時間常數
const TIME_CONSTANTS = {
    SECOND: 1,
    MINUTE: 60,
    HOUR: 3600,
    DAY: 86400,
    MONTH: 86400 * 30,
} as const;

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

// 格式化發布時間
const formatPublishedTime = (created_utc: number): string => {
    const now = new Date();
    const published = new Date(created_utc * 1000); // Reddit 時間戳是秒，需要轉換為毫秒
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);

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

// 取得適合的縮圖 URL
const getThumbnailUrl = (article: SimplifiedRedditArticle): string => {
    // 優先使用 preview_image
    if (article.preview_image) {
        // Reddit 的 preview_image URL 需要解碼 HTML entities
        return article.preview_image.replace(/&amp;/g, '&');
    }

    // 如果 thumbnail 是有效的 URL，使用它
    if (article.thumbnail?.startsWith('http')) {
        return article.thumbnail;
    }

    // 否則返回空字符串
    return '';
};

interface RedditArticleCardProps {
    article: SimplifiedRedditArticle;
}

const RedditArticleCard = ({ article }: RedditArticleCardProps) => {
    const thumbnailUrl = getThumbnailUrl(article);
    const redditUrl = `https://www.reddit.com${article.permalink}`;

    // 提取重複的樣式類名
    const cardHeightClasses = 'h-[120px] sm:h-[140px]';
    const textMutedClasses = 'text-muted-foreground text-xs';
    const badgeTextClasses = 'text-xs';

    return (
        <a href={redditUrl} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <div className={cn('flex flex-row', cardHeightClasses)}>
                    {thumbnailUrl && (
                        <div className="relative w-24 flex-shrink-0 sm:w-32 md:w-40 lg:w-48">
                            <NativeImage
                                className="h-full w-full object-cover"
                                src={thumbnailUrl}
                                alt={article.title}
                                loading="lazy"
                            />
                            {article.is_video && (
                                <Badge className={cn('absolute right-1 bottom-1 px-1 py-0.5', badgeTextClasses)}>
                                    VIDEO
                                </Badge>
                            )}
                        </div>
                    )}
                    <CardContent className={cn('flex flex-1 flex-col justify-between p-3 sm:p-4', cardHeightClasses)}>
                        <div>
                            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
                                <Badge variant="secondary" className={badgeTextClasses}>
                                    r/{article.subreddit}
                                </Badge>
                                <span className={cn('hidden sm:inline', textMutedClasses)}>by {article.author}</span>
                                <span className={textMutedClasses}>{formatPublishedTime(article.created_utc)}</span>
                            </div>
                            <h3 className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-semibold transition-colors sm:text-base lg:text-lg">
                                {article.title}
                            </h3>
                        </div>
                        <div className={cn('mt-2 flex items-center gap-2 sm:gap-4 sm:text-sm', textMutedClasses)}>
                            <div className="flex items-center gap-1">
                                <span>👍</span>
                                <span>{formatNumber(article.score)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>💬</span>
                                <span className="hidden sm:inline">{formatNumber(article.num_comments)} 留言</span>
                                <span className="sm:hidden">{formatNumber(article.num_comments)}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </a>
    );
};

export default RedditArticleCard;
