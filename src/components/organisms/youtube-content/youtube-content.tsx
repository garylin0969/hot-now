import type { youtube_v3 } from 'googleapis';
import YoutubeVideoCard from '@/components/molecules/youtube-video-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface YouTubeContentProps {
    latestVideos: youtube_v3.Schema$Video[];
    gamingVideos: youtube_v3.Schema$Video[];
    musicVideos: youtube_v3.Schema$Video[];
    filmVideos: youtube_v3.Schema$Video[];
}

const CATEGORY_TABS = [
    { value: 'latest', label: '最新' },
    { value: 'gaming', label: '遊戲' },
    { value: 'music', label: '音樂' },
    { value: 'film', label: '電影' },
] as const;

const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

const YouTubeContent = ({ latestVideos, gamingVideos, musicVideos, filmVideos }: YouTubeContentProps) => {
    return (
        <div className="w-full">
            <Tabs defaultValue="latest">
                {/* 類別選擇器 */}
                <div className="mb-6">
                    <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-4">
                        {CATEGORY_TABS.map(({ value, label }) => (
                            <TabsTrigger key={value} value={value} className={`text-sm ${ACTIVE_TAB_CLASS}`}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* 最新影片 */}
                <TabsContent value="latest">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {latestVideos?.map((video) => (
                            <YoutubeVideoCard key={`latest-${video.id}`} video={video} />
                        ))}
                    </div>
                </TabsContent>

                {/* 遊戲影片 */}
                <TabsContent value="gaming">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {gamingVideos?.map((video) => (
                            <YoutubeVideoCard key={`gaming-${video.id}`} video={video} />
                        ))}
                    </div>
                </TabsContent>

                {/* 音樂影片 */}
                <TabsContent value="music">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {musicVideos?.map((video) => (
                            <YoutubeVideoCard key={`music-${video.id}`} video={video} />
                        ))}
                    </div>
                </TabsContent>

                {/* 電影影片 */}
                <TabsContent value="film">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {filmVideos?.map((video) => (
                            <YoutubeVideoCard key={`film-${video.id}`} video={video} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default YouTubeContent;
