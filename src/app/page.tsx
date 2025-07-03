import { GetGamerTrends } from '@/api/gamer-api';
import { GetGoogleTrends } from '@/api/google-api';
import { GetKomicaTrends } from '@/api/komica-api';
import { GetPttTrends } from '@/api/ptt-api';
import { GetSimplifiedRedditHotArticles } from '@/api/reddit-api';
import { GetYoutubeHotVideosWithCache } from '@/api/youtube-api';
import GamerArticleCard from '@/components/molecules/gamer-article-card';
import GoogleTrendCard from '@/components/molecules/google-trend-card';
import KomicaList from '@/components/molecules/komica-list';
import PttArticleCard from '@/components/molecules/ptt-article-card';
import RedditArticleCard from '@/components/molecules/reddit-article-card';
import YoutubeVideoCard from '@/components/molecules/youtube-video-card';
import Shortcuts from '@/components/organisms/shortcuts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = async () => {
    // Youtube
    const youtubeResponse = await GetYoutubeHotVideosWithCache();
    const youtubeVideos = youtubeResponse?.data?.items || [];
    // PTT
    const pttResponse = await GetPttTrends();
    const pttArticles = pttResponse.articles || [];
    // Google
    const googleResponse = await GetGoogleTrends();
    const googleTrends = googleResponse.trends || [];
    // Gamer
    const gamerResponse = await GetGamerTrends();
    const gamerTrends = gamerResponse.trends || [];
    // Reddit
    const redditArticles = await GetSimplifiedRedditHotArticles(50);
    // Komica
    const komicaResponse = await GetKomicaTrends();
    const komicaTrends = komicaResponse.trends || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-4 flex justify-center">
                <Shortcuts />
            </div>
            <Tabs defaultValue="youtube" className="w-full">
                <TabsList className="text-muted-foreground mx-auto mb-3 space-x-1 bg-transparent">
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
                        value="youtube"
                    >
                        Youtube
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
                        value="ptt"
                    >
                        PTT
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
                        value="google"
                    >
                        Google
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
                        value="gamer"
                    >
                        Gamer
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
                        value="reddit"
                    >
                        Reddit
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
                        value="komica"
                    >
                        Komica
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="youtube">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {youtubeVideos?.map((video) => (
                            <YoutubeVideoCard key={video.id} video={video} />
                        ))}
                    </div>
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
                            <GamerArticleCard key={article.link} article={article} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="reddit">
                    <div className="mx-auto flex max-w-4xl flex-col gap-4">
                        {redditArticles?.map((article) => (
                            <RedditArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="komica">
                    <KomicaList className="mx-auto max-w-xl" trends={komicaTrends} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Home;
