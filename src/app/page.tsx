import { GetHotVideos } from '@/api/youtube-api';
import VideoCard from '@/components/molecules/video-card/video-card';

const Home = async () => {
    const response = await GetHotVideos();
    const videos = response?.data?.items || [];

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default Home;
