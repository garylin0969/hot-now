import type { youtube_v3 } from 'googleapis';

import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface VideoCardProps {
    video: youtube_v3.Schema$Video;
}

// 格式化觀看次數
const formatViewCount = (viewCount: string | null | undefined): string => {
    if (!viewCount) return '0 次觀看';

    const count = parseInt(viewCount);
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M 次觀看`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K 次觀看`;
    } else {
        return `${count} 次觀看`;
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

const VideoCard = ({ video }: VideoCardProps) => {
    const { snippet, statistics } = video;

    if (!snippet) return null;

    const thumbnailUrl = snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '';
    const title = snippet.title || '無標題';
    const channelTitle = snippet.channelTitle || '未知頻道';
    const viewCount = statistics?.viewCount;
    const publishedAt = snippet.publishedAt;

    return (
        <Card className='cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-lg'>
            <div className='relative aspect-video'>
                <Image
                    src={thumbnailUrl}
                    alt={title}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                {/* 如果有直播標籤，可以在這裡顯示 */}
                {snippet.liveBroadcastContent === 'live' && (
                    <Badge variant='destructive' className='absolute top-2 left-2'>
                        直播中
                    </Badge>
                )}
            </div>

            <CardContent className='p-4'>
                <h3 className='mb-2 line-clamp-2 text-sm leading-5 font-semibold'>{title}</h3>

                <div className='text-muted-foreground space-y-1 text-xs'>
                    <p className='text-foreground font-medium'>{channelTitle}</p>

                    <div className='flex items-center space-x-2'>
                        <span>{formatViewCount(viewCount)}</span>
                        <span>•</span>
                        <span>{formatPublishedTime(publishedAt)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default VideoCard;
