import BaseImage from '@/components/atoms/base-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { SimplifiedRedditArticle } from '@/types';
import { formatRelativeTime } from '@/utils/date';
import { formatCompactNumber } from '@/utils/number';
import { cn } from '@/utils/shadcn';

/**
 * 取得適合的縮圖 URL
 *
 * @param article - Reddit 文章資料
 * @returns 縮圖 URL 字串
 */
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

/**
 * Reddit 文章卡片元件的屬性介面
 */
interface RedditArticleCardProps {
    /** Reddit 文章資料 */
    article: SimplifiedRedditArticle;
}

/**
 * 顯示 Reddit 熱門文章的卡片元件
 *
 * @param props - 元件屬性
 * @param props.article - 文章資料
 * @returns 渲染後的文章卡片
 */
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
                    <div className="relative hidden w-24 shrink-0 overflow-hidden md:block md:w-40 lg:w-48">
                        <BaseImage
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            src={thumbnailUrl}
                            alt={`${article.title} image`}
                            fill
                        />
                        {article.is_video && (
                            <Badge className={cn('absolute right-1 bottom-1 px-1 py-0.5', badgeTextClasses)}>
                                VIDEO
                            </Badge>
                        )}
                    </div>
                    <CardContent className={cn('flex flex-1 flex-col justify-between p-3 sm:p-4', cardHeightClasses)}>
                        <div>
                            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
                                <Badge variant="secondary" className={badgeTextClasses}>
                                    r/{article.subreddit}
                                </Badge>
                                <span className={cn('hidden sm:inline', textMutedClasses)}>by {article.author}</span>
                                <span className={textMutedClasses}>
                                    {formatRelativeTime(article.created_utc * 1000)}
                                </span>
                            </div>
                            <div className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-semibold transition-colors sm:text-base lg:text-lg">
                                {article.title}
                            </div>
                        </div>
                        <div className={cn('mt-2 flex items-center gap-2 sm:gap-4 sm:text-sm', textMutedClasses)}>
                            <div className="flex items-center gap-1">
                                <span>👍</span>
                                <span>{formatCompactNumber(article.score)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>💬</span>
                                <span className="hidden sm:inline">
                                    {formatCompactNumber(article.num_comments)} 留言
                                </span>
                                <span className="sm:hidden">{formatCompactNumber(article.num_comments)}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </a>
    );
};

export default RedditArticleCard;
