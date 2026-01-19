/**
 * @fileoverview YouTube 影片卡片元件
 */
import type { youtube_v3 } from 'googleapis';
import BaseImage from '@/components/atoms/base-image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatRelativeTime } from '@/utils/date';
import { formatCompactNumber } from '@/utils/number';

/**
 * 判斷影片是否為 Shorts (短影音)
 * 檢查影片時長是否小於 60 秒
 *
 * @param duration - ISO 8601 格式的持續時間字串 (例如: PT1M30S)
 * @returns 若為 Shorts 則返回 true
 */
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

/** YouTube 影片卡片屬性介面 */
interface YoutubeVideoCardProps {
    /** YouTube 影片資料物件 */
    video: youtube_v3.Schema$Video;
}

/**
 * 顯示 YouTube 影片資訊的卡片元件
 * 包含縮圖、標題、頻道名稱、觀看次數與發布時間。
 * 自動偵測並標記 Shorts 影片。
 *
 * @param props - 元件屬性
 * @param props.video - 影片資料
 * @returns 渲染後的影片卡片
 */
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
        <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="flex h-full cursor-pointer flex-col overflow-hidden pt-0 hover:shadow-lg">
                <AspectRatio className="overflow-hidden" ratio={16 / 9}>
                    <BaseImage
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        src={thumbnailUrl}
                        alt={`${title} image`}
                        fill
                    />
                    {isShort && <Badge className="absolute right-2 bottom-2">SHORTS</Badge>}
                </AspectRatio>
                <CardContent className="flex flex-1 flex-col justify-between space-y-2 px-4">
                    <div className="space-y-2">
                        <div className="group-hover:text-primary line-clamp-2 h-10 text-sm leading-5 font-semibold">
                            {title}
                        </div>
                        <p className="text-muted-foreground line-clamp-3 h-12 text-xs leading-4">{description}</p>
                    </div>
                    <div className="text-muted-foreground space-y-2 text-xs">
                        <p className="text-foreground font-medium">頻道：{channelTitle}</p>
                        <div className="flex items-center space-x-2">
                            <span>觀看次數：{formatCompactNumber(viewCount ?? '0')}</span>
                            <span>•</span>
                            <span>{formatRelativeTime(publishedAt ?? '')}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
};

export default YoutubeVideoCard;
