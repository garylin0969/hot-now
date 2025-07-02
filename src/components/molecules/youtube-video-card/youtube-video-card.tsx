import type { youtube_v3 } from 'googleapis';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// 判斷是否為 Shorts
const isShorts = (duration: string): boolean => {
    // Match ISO 8601 duration format: PT#H#M#S
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = duration.match(regex);

    if (!match) return false;

    const hours = parseInt(match[1] ?? '0', 10);
    const minutes = parseInt(match[2] ?? '0', 10);
    const seconds = parseInt(match[3] ?? '0', 10);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds > 0 && totalSeconds < 60;
};

// 格式化觀看次數
const formatViewCount = (viewCount: string | null | undefined): string => {
    if (!viewCount) return '0';

    const count = parseInt(viewCount);
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    } else {
        return `${count}`;
    }
};

// 格式化發布時間
const formatPublishedTime = (publishedAt: string | null | undefined): string => {
    if (!publishedAt) return '';

    const now = new Date();
    const published = new Date(publishedAt);
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);

    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} 分鐘前`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} 小時前`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} 天前`;
    }
};

interface YoutubeVideoCardProps {
    video: youtube_v3.Schema$Video;
}

const YoutubeVideoCard = ({ video }: YoutubeVideoCardProps) => {
    const { id, snippet, statistics, contentDetails } = video;

    if (!snippet) return null;

    const thumbnailUrl = snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '';
    const isShort = isShorts(contentDetails?.duration || '');
    const title = snippet.title || '無標題';
    const description = snippet.description || '無描述';
    const channelTitle = snippet.channelTitle || '未知頻道';
    const viewCount = statistics?.viewCount;
    const publishedAt = snippet.publishedAt;

    return (
        <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
            <Card className="flex h-full cursor-pointer flex-col overflow-hidden pt-0 hover:shadow-lg">
                <AspectRatio ratio={16 / 9}>
                    <Image
                        src={thumbnailUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {isShort && <Badge className="absolute right-2 bottom-2">Shorts</Badge>}
                </AspectRatio>
                <CardContent className="flex flex-1 flex-col justify-between space-y-2 px-4">
                    <div className="space-y-2">
                        <h3 className="line-clamp-2 h-10 text-sm leading-5 font-semibold">{title}</h3>
                        <p className="text-muted-foreground line-clamp-3 h-12 text-xs leading-4">{description}</p>
                    </div>
                    <div className="text-muted-foreground space-y-2 text-xs">
                        <p className="text-foreground font-medium">頻道：{channelTitle}</p>
                        <div className="flex items-center space-x-2">
                            <span>觀看次數：{formatViewCount(viewCount)}</span>
                            <span>•</span>
                            <span>{formatPublishedTime(publishedAt)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
};

export default YoutubeVideoCard;
