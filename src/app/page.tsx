import { GetSimplifiedNewsDataHotNews } from '@/api/news-data-api';
import { GetSimplifiedRedditHotPosts } from '@/api/reddit-api';
import { GetYoutubeHotVideosWithCache } from '@/api/youtube-api';
import NewsDataCard from '@/components/molecules/news-data-card';
import RedditPostCard from '@/components/molecules/reddit-post-card';
import YoutubeVideoCard from '@/components/molecules/youtube-video-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = async () => {
    // Youtube
    const youtubeResponse = await GetYoutubeHotVideosWithCache();
    const youtubeVideos = youtubeResponse?.data?.items || [];
    // Reddit
    const redditPosts = await GetSimplifiedRedditHotPosts(50);
    // News
    const newsDataResults = await GetSimplifiedNewsDataHotNews(10);

    return (
        <div className="container mx-auto px-4 py-8">
            <Tabs defaultValue="youtube" className="w-full">
                <TabsList className="mx-auto mb-4">
                    <TabsTrigger value="youtube">Youtube</TabsTrigger>
                    <TabsTrigger value="reddit">Reddit</TabsTrigger>
                    <TabsTrigger value="news">新聞</TabsTrigger>
                </TabsList>
                <TabsContent value="youtube">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {youtubeVideos?.map((video) => (
                            <YoutubeVideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="reddit">
                    <div className="mx-auto flex max-w-4xl flex-col gap-4">
                        {redditPosts?.map((post) => (
                            <RedditPostCard key={post.id} post={post} />
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
            </Tabs>
        </div>
    );
};

export default Home;
