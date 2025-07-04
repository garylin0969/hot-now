import type { youtube_v3 } from 'googleapis';
import YoutubeVideoCard from '@/components/molecules/youtube-video-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/utils/shadcn';

// 頁籤資料
const CATEGORY_TABS = [
    { value: 'latest', label: '最新' },
    { value: 'gaming', label: '遊戲' },
    { value: 'music', label: '音樂' },
    { value: 'film', label: '電影' },
] as const;

// 頁籤樣式
const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

interface YouTubeContentProps {
    className?: string;
    latestVideos: youtube_v3.Schema$Video[];
    gamingVideos: youtube_v3.Schema$Video[];
    musicVideos: youtube_v3.Schema$Video[];
    filmVideos: youtube_v3.Schema$Video[];
}

const YouTubeContent = ({ className, latestVideos, gamingVideos, musicVideos, filmVideos }: YouTubeContentProps) => {
    // 影片資料
    const videoData = {
        latest: latestVideos,
        gaming: gamingVideos,
        music: musicVideos,
        film: filmVideos,
    };

    // 渲染影片
    const renderVideoGrid = (videos: youtube_v3.Schema$Video[], keyPrefix: string) => (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {videos?.map((video) => (
                <YoutubeVideoCard key={`${keyPrefix}-${video.id}`} video={video} />
            ))}
        </div>
    );

    return (
        <div className={cn('w-full', className)}>
            <Tabs defaultValue={CATEGORY_TABS[0]?.value}>
                {/* 類別選擇器 */}
                <div className="mb-6">
                    <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-4">
                        {CATEGORY_TABS?.map(({ value, label }) => (
                            <TabsTrigger key={value} value={value} className={cn('text-sm', ACTIVE_TAB_CLASS)}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* 動態渲染所有類別的內容 */}
                {CATEGORY_TABS?.map(({ value }) => (
                    <TabsContent key={value} value={value}>
                        {renderVideoGrid(videoData[value], value)}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default YouTubeContent;
