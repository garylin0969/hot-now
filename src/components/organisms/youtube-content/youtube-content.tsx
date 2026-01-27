/**
 * @fileoverview YouTube 內容區塊元件
 */
import type { ComponentProps } from 'react';
import YoutubeVideoCard from '@/components/molecules/youtube-video-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { YOUTUBE_CATEGORIES, type YouTubeCategoryKey } from '@/constants/youtube';
import { GetYoutubeHotVideos, GetYoutubeHotVideosByCategory } from '@/services/youtube-api';
import type { YouTubeVideo } from '@/types/youtube';
import { cn } from '@/utils/shadcn';

/** 頁籤樣式類名 */
const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

/**
 * YouTube 發燒影片內容區塊
 * 非同步 Server Component，負責獲取並顯示 YouTube 各類別的熱門影片。
 *
 * @param props - 元件屬性
 * @returns 渲染後的 YouTube 內容區塊
 */
const YouTubeContent = async ({ className, ...props }: ComponentProps<'div'>) => {
    // 獲取不同類別的影片
    const [latestResponse, gamingResponse, musicResponse, filmResponse] = await Promise.all([
        GetYoutubeHotVideos(), // 最新
        GetYoutubeHotVideosByCategory('gaming'), // 遊戲
        GetYoutubeHotVideosByCategory('music'), // 音樂
        GetYoutubeHotVideosByCategory('film'), // 電影
    ]);
    const latestVideos = latestResponse?.items || [];
    const gamingVideos = gamingResponse?.items || [];
    const musicVideos = musicResponse?.items || [];
    const filmVideos = filmResponse?.items || [];

    // 影片資料
    const videoData = {
        latest: latestVideos,
        gaming: gamingVideos,
        music: musicVideos,
        film: filmVideos,
    };

    // 取得所有類別鍵值
    const categoryKeys = Object.keys(YOUTUBE_CATEGORIES) as YouTubeCategoryKey[];

    // 渲染影片
    const renderVideoGrid = (videos: YouTubeVideo[], keyPrefix: string) => (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {videos?.map((video) => (
                <YoutubeVideoCard key={`${keyPrefix}-${video.id}`} video={video} />
            ))}
        </div>
    );

    return (
        <div className={cn('w-full', className)} {...props}>
            <Tabs defaultValue={categoryKeys[0]}>
                {/* 類別選擇器 */}
                <div className="mb-6">
                    <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-4">
                        {categoryKeys.map((key) => (
                            <TabsTrigger key={key} value={key} className={cn('text-sm', ACTIVE_TAB_CLASS)}>
                                {YOUTUBE_CATEGORIES[key].label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* 動態渲染所有類別的內容 */}
                {categoryKeys.map((key) => (
                    <TabsContent key={key} value={key}>
                        {renderVideoGrid(videoData[key], key)}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default YouTubeContent;
