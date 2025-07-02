import { GetYoutubeHotVideosWithCache } from '@/api/youtube-api';
import YoutubeVideoCard from '@/components/molecules/youtube-video-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = async () => {
    const response = await GetYoutubeHotVideosWithCache();
    const videos = response?.data?.items || [];

    return (
        <div className='container mx-auto px-4 py-8'>
            <Tabs defaultValue='youtube' className='w-full'>
                <TabsList>
                    <TabsTrigger value='youtube'>Youtube</TabsTrigger>
                    <TabsTrigger value='reddit'>Reddit</TabsTrigger>
                </TabsList>
                <TabsContent value='youtube'>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
                        {videos.map(video => (
                            <YoutubeVideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value='reddit'>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
                        {videos.map(video => (
                            <YoutubeVideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Home;
