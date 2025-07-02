import type { SimplifiedRedditPost } from '@/api/reddit-api';
import NativeImage from '@/components/atoms/native-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// 格式化分數
const formatScore = (score: number): string => {
    if (score >= 1000000) {
        return `${(score / 1000000).toFixed(1)}M`;
    } else if (score >= 1000) {
        return `${(score / 1000).toFixed(1)}K`;
    } else {
        return score.toString();
    }
};

// 格式化評論數
const formatCommentCount = (count: number): string => {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    } else {
        return count.toString();
    }
};

// 格式化發布時間
const formatPublishedTime = (created_utc: number): string => {
    const now = new Date();
    const published = new Date(created_utc * 1000); // Reddit 時間戳是秒，需要轉換為毫秒
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);

    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} 分鐘前`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} 小時前`;
    } else if (diffInSeconds < 86400 * 30) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} 天前`;
    } else {
        const months = Math.floor(diffInSeconds / (86400 * 30));
        return `${months} 個月前`;
    }
};

// 取得適合的縮圖 URL
const getThumbnailUrl = (post: SimplifiedRedditPost): string => {
    // 優先使用 preview_image
    if (post.preview_image) {
        // Reddit 的 preview_image URL 需要解碼 HTML entities
        return post.preview_image.replace(/&amp;/g, '&');
    }

    // 如果 thumbnail 是有效的 URL，使用它
    if (post.thumbnail && post.thumbnail.startsWith('http')) {
        return post.thumbnail;
    }

    // 否則返回默認圖片或 null
    return '';
};

interface RedditPostCardProps {
    post: SimplifiedRedditPost;
}

const RedditPostCard = ({ post }: RedditPostCardProps) => {
    const thumbnailUrl = getThumbnailUrl(post);
    const redditUrl = `https://www.reddit.com${post.permalink}`;

    return (
        <a href={redditUrl} target="_blank" rel="noopener noreferrer">
            <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <div className="flex h-[120px] flex-row sm:h-[140px]">
                    {thumbnailUrl && (
                        <div className="relative w-24 flex-shrink-0 sm:w-32 md:w-40 lg:w-48">
                            <NativeImage
                                className="h-full w-full object-cover"
                                src={thumbnailUrl}
                                alt={post.title}
                                loading="lazy"
                            />
                            {post.is_video && (
                                <Badge className="absolute right-1 bottom-1 px-1 py-0.5 text-xs">VIDEO</Badge>
                            )}
                        </div>
                    )}
                    <CardContent className="flex h-[120px] flex-1 flex-col justify-between p-3 sm:h-[140px] sm:p-4">
                        <div className="space-y-2 sm:space-y-3">
                            <div className="space-y-1 sm:space-y-2">
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                        r/{post.subreddit}
                                    </Badge>
                                    <span className="text-muted-foreground hidden text-xs sm:inline">
                                        by {post.author}
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        {formatPublishedTime(post.created_utc)}
                                    </span>
                                </div>
                                <h3 className="hover:text-primary line-clamp-2 text-sm leading-tight font-semibold transition-colors sm:text-base lg:text-lg">
                                    {post.title}
                                </h3>
                            </div>
                        </div>
                        <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs sm:gap-4 sm:text-sm">
                            <div className="flex items-center gap-1">
                                <span>👍</span>
                                <span>{formatScore(post.score)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>💬</span>
                                <span className="hidden sm:inline">{formatCommentCount(post.num_comments)} 留言</span>
                                <span className="sm:hidden">{formatCommentCount(post.num_comments)}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </a>
    );
};

export default RedditPostCard;
