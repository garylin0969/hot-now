import { GetGamerTrends } from '@/api/gamer-api';
import { GetGoogleTrends } from '@/api/google-api';
import { GetKomicaTrends } from '@/api/komica-api';
import { GetPttTrends } from '@/api/ptt-api';
import { GetYoutubeHotVideosWithCache, GetYoutubeHotVideosByCategory } from '@/api/youtube-api';
import GamerArticleCard from '@/components/molecules/gamer-article-card';
import GoogleTrendCard from '@/components/molecules/google-trend-card';
import KomicaList from '@/components/molecules/komica-list';
import PttArticleCard from '@/components/molecules/ptt-article-card';
import RedditContent from '@/components/organisms/reddit-content';
import Shortcuts from '@/components/organisms/shortcuts';
import YouTubeContent from '@/components/organisms/youtube-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = async () => {
    // Youtube - 獲取不同類別的影片
    const [youtubeLatestResponse, youtubeGamingResponse, youtubeMusicResponse, youtubeFilmResponse] = await Promise.all(
        [
            GetYoutubeHotVideosWithCache(),
            GetYoutubeHotVideosByCategory('gaming'),
            GetYoutubeHotVideosByCategory('music'),
            GetYoutubeHotVideosByCategory('film'),
        ]
    );

    const youtubeLatestVideos = youtubeLatestResponse?.data?.items || [];
    const youtubeGamingVideos = youtubeGamingResponse?.data?.items || [];
    const youtubeMusicVideos = youtubeMusicResponse?.data?.items || [];
    const youtubeFilmVideos = youtubeFilmResponse?.data?.items || [];
    // PTT
    const pttResponse = await GetPttTrends();
    const pttArticles = pttResponse.articles || [];
    // Google
    const googleResponse = await GetGoogleTrends();
    const googleTrends = googleResponse.trends || [];
    // Gamer
    const gamerResponse = await GetGamerTrends();
    const gamerTrends = gamerResponse.data?.game || [];
    // Komica
    const komicaResponse = await GetKomicaTrends();
    const komicaTrends = komicaResponse.trends || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-4 flex justify-center">
                <Shortcuts />
            </div>
            <Tabs defaultValue="youtube" className="w-full">
                <div className="mb-3 flex w-full justify-center">
                    <TabsList className="text-muted-foreground mx-auto max-w-full space-x-1 bg-transparent sm:min-w-fit">
                        <TabsTrigger
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground flex-shrink-0 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                            value="youtube"
                        >
                            Youtube
                        </TabsTrigger>
                        <TabsTrigger
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground flex-shrink-0 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                            value="ptt"
                        >
                            PTT
                        </TabsTrigger>
                        <TabsTrigger
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground flex-shrink-0 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                            value="google"
                        >
                            Google
                        </TabsTrigger>
                        <TabsTrigger
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground flex-shrink-0 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                            value="gamer"
                        >
                            Gamer
                        </TabsTrigger>
                        <TabsTrigger
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground flex-shrink-0 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                            value="reddit"
                        >
                            Reddit
                        </TabsTrigger>
                        <TabsTrigger
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground flex-shrink-0 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                            value="komica"
                        >
                            Komica
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="youtube">
                    <YouTubeContent
                        latestVideos={youtubeLatestVideos}
                        gamingVideos={youtubeGamingVideos}
                        musicVideos={youtubeMusicVideos}
                        filmVideos={youtubeFilmVideos}
                    />
                </TabsContent>
                <TabsContent value="ptt">
                    <div className="mb-4 flex items-center justify-center">
                        <div className="text-primary bg-primary/10 rounded-2xl px-4 py-2 font-extrabold">
                            24H熱門文章
                        </div>
                    </div>
                    <div className="mx-auto flex max-w-3xl flex-col gap-4">
                        {pttArticles?.map((article) => (
                            <PttArticleCard key={article.link} article={article} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="google">
                    <div className="mb-4 flex items-center justify-center">
                        <div className="text-primary bg-primary/10 rounded-2xl px-4 py-2 font-extrabold">過去4小時</div>
                    </div>
                    <div className="mx-auto flex max-w-xl flex-col gap-4">
                        {googleTrends?.map((trend) => (
                            <GoogleTrendCard key={trend.googleTrend} trend={trend} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="gamer">
                    <div className="mb-4 flex items-center justify-center">
                        <div className="text-primary bg-primary/10 rounded-2xl px-4 py-2 font-extrabold">熱門話題</div>
                    </div>
                    <div className="mx-auto flex max-w-4xl flex-col gap-4">
                        {gamerTrends?.map((article) => (
                            <GamerArticleCard key={`${article.bsn}-${article.snA}`} article={article} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="reddit">
                    <RedditContent />
                </TabsContent>
                <TabsContent value="komica">
                    <KomicaList className="mx-auto max-w-xl" trends={komicaTrends} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Home;
