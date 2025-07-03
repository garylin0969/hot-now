import { GetKomicaTrends } from '@/api/komica-api';
import { GetSimplifiedNewsDataHotNews } from '@/api/news-data-api';
import { GetPttTrends } from '@/api/ptt-api';
import { GetSimplifiedRedditHotArticles } from '@/api/reddit-api';
import { GetYoutubeHotVideosWithCache } from '@/api/youtube-api';
import KomicaList from '@/components/molecules/komica-list';
import NewsDataCard from '@/components/molecules/news-data-card';
import PttArticleCard from '@/components/molecules/ptt-article-card';
import RedditArticleCard from '@/components/molecules/reddit-article-card';
import YoutubeVideoCard from '@/components/molecules/youtube-video-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = async () => {
    // Youtube
    const youtubeResponse = await GetYoutubeHotVideosWithCache();
    const youtubeVideos = youtubeResponse?.data?.items || [];
    // PTT
    const pttResponse = await GetPttTrends();
    const pttArticles = pttResponse.articles || [];
    // Reddit
    const redditArticles = await GetSimplifiedRedditHotArticles(50);
    // News
    const newsDataResults = await GetSimplifiedNewsDataHotNews(10);
    // Komica
    const komicaResponse = await GetKomicaTrends();
    const komicaTrends = komicaResponse.trends || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <Tabs defaultValue="youtube" className="w-full">
                <TabsList className="text-muted-foreground mx-auto mb-4 space-x-1 bg-transparent">
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                        value="youtube"
                    >
                        Youtube
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                        value="ptt"
                    >
                        PTT
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                        value="reddit"
                    >
                        Reddit
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                        value="news"
                    >
                        News
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground"
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
                    <div className="mx-auto flex max-w-4xl flex-col gap-4">
                        {pttArticles?.map((article) => (
                            <PttArticleCard key={article.link} article={article} />
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
                <TabsContent value="news">
                    <div className="mx-auto flex max-w-4xl flex-col gap-4">
                        {newsDataResults?.map((news) => (
                            <NewsDataCard key={news.article_id} news={news} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="komica">
                    <KomicaList className="mx-auto max-w-2xl" trends={komicaTrends} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Home;
