'use client';

import type { youtube_v3 } from 'googleapis';
import { useState, useMemo } from 'react';
import YoutubeVideoCard from '@/components/molecules/youtube-video-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { YouTubeCategoryKey } from '@/services/youtube-api';

interface YouTubeContentProps {
    latestVideos: youtube_v3.Schema$Video[];
    gamingVideos: youtube_v3.Schema$Video[];
    musicVideos: youtube_v3.Schema$Video[];
    filmVideos: youtube_v3.Schema$Video[];
}

type CategoryType = YouTubeCategoryKey;

const CATEGORY_TABS = [
    { value: 'latest', label: '最新' },
    { value: 'gaming', label: '遊戲' },
    { value: 'music', label: '音樂' },
    { value: 'film', label: '電影' },
] as const;

const ACTIVE_TAB_CLASS = 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

const YouTubeContent = ({ latestVideos, gamingVideos, musicVideos, filmVideos }: YouTubeContentProps) => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('latest');

    const currentVideos = useMemo(() => {
        const videoMap = {
            latest: latestVideos,
            gaming: gamingVideos,
            music: musicVideos,
            film: filmVideos,
        };
        return videoMap[selectedCategory] || [];
    }, [selectedCategory, latestVideos, gamingVideos, musicVideos, filmVideos]);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value as CategoryType);
    };

    return (
        <div className="w-full">
            {/* 類別選擇器 */}
            <div className="mb-6">
                <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
                    <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-4">
                        {CATEGORY_TABS.map(({ value, label }) => (
                            <TabsTrigger key={value} value={value} className={`text-sm ${ACTIVE_TAB_CLASS}`}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* 影片網格 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {currentVideos?.map((video) => (
                    <YoutubeVideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default YouTubeContent;
