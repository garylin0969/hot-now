import { GetBbcTrends } from '@/api/bbc-api';
import { GetGamerTrends } from '@/api/gamer-api';
import { GetGoogleTrends } from '@/api/google-api';
import { GetKomicaTrends } from '@/api/komica-api';
import { GetPttTrends } from '@/api/ptt-api';
import {
    GetSimplifiedRedditAllHotTrends,
    GetSimplifiedRedditTaiwaneseHotTrends,
    GetSimplifiedRedditChinaIrlHotTrends,
} from '@/api/reddit-api';
import { GetYoutubeHotVideosWithCache, GetYoutubeHotVideosByCategory } from '@/api/youtube-api';
import SectionTitle from '@/components/atoms/section-title';
import BbcArticleCard from '@/components/molecules/bbc-article-card';
import GoogleTrendCard from '@/components/molecules/google-trend-card';
import KomicaList from '@/components/molecules/komica-list';
import PttArticleCard from '@/components/molecules/ptt-article-card';
import ScrollableTabsWrapper from '@/components/molecules/scrollable-tabs-wrapper';
import GamerContent from '@/components/organisms/gamer-content';
import RedditContent from '@/components/organisms/reddit-content';
import Shortcuts from '@/components/organisms/shortcuts';
import YouTubeContent from '@/components/organisms/youtube-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TABS = [
    { label: 'Youtube', value: 'youtube' },
    { label: 'PTT', value: 'ptt' },
    { label: 'BBC', value: 'bbc' },
    { label: 'Google', value: 'google' },
    { label: 'Gamer', value: 'gamer' },
    { label: 'Reddit', value: 'reddit' },
    { label: 'Komica', value: 'komica' },
];

// 頁籤樣式
const TAB_TRIGGER_CLASSNAME =
    'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ' +
    'hover:bg-accent hover:text-accent-foreground ' +
    'flex-shrink-0 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm';

const Home = async () => {
    // YouTube - 獲取不同類別的影片
    const [youtubeLatestResponse, youtubeGamingResponse, youtubeMusicResponse, youtubeFilmResponse] = await Promise.all(
        [
            GetYoutubeHotVideosWithCache(), // 最新
            GetYoutubeHotVideosByCategory('gaming'), // 遊戲
            GetYoutubeHotVideosByCategory('music'), // 音樂
            GetYoutubeHotVideosByCategory('film'), // 電影
        ]
    );
    const youtubeLatestVideos = youtubeLatestResponse?.data?.items || []; // 最新
    const youtubeGamingVideos = youtubeGamingResponse?.data?.items || []; // 遊戲
    const youtubeMusicVideos = youtubeMusicResponse?.data?.items || []; // 音樂
    const youtubeFilmVideos = youtubeFilmResponse?.data?.items || []; // 電影

    // PTT
    const pttResponse = await GetPttTrends();
    const pttArticles = pttResponse.articles || [];

    // BBC
    const bbcResponse = await GetBbcTrends();
    const bbcArticles = bbcResponse.trends || [];

    // Google
    const googleResponse = await GetGoogleTrends();
    const googleTrends = googleResponse.trends || [];

    // Gamer - 获取所有分类数据
    const gamerResponse = await GetGamerTrends();
    const gamerAllTrends = gamerResponse.data?.all || []; // 所有
    const gamerGameTrends = gamerResponse.data?.game || []; // 遊戲
    const gamerAcTrends = gamerResponse.data?.ac || []; // 動作
    const gamerLifeTrends = gamerResponse.data?.life || []; // 生活

    // Komica
    const komicaResponse = await GetKomicaTrends();
    const komicaTrends = komicaResponse.trends || [];

    // Reddit - 獲取爬蟲資料
    const redditAllArticles = await GetSimplifiedRedditAllHotTrends();
    const redditTaiwaneseArticles = await GetSimplifiedRedditTaiwaneseHotTrends();
    const redditChinaIrlArticles = await GetSimplifiedRedditChinaIrlHotTrends();

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Reddit 資料預載，避免TAB載入時的延遲，因為Reddit API是Client Side */}
            {/* <RedditPrefetch /> */}
            <div className="mb-4 flex justify-center">
                <Shortcuts />
            </div>
            <Tabs defaultValue={TABS[0]?.value} className="w-full">
                <div className="mb-3 flex w-full justify-center">
                    <ScrollableTabsWrapper>
                        <TabsList className="text-muted-foreground mx-auto space-x-1 bg-transparent">
                            {TABS.map((tab) => (
                                <TabsTrigger key={tab?.value} className={TAB_TRIGGER_CLASSNAME} value={tab?.value}>
                                    {tab?.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </ScrollableTabsWrapper>
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
                    <SectionTitle title="24H熱門文章" />
                    <div className="mx-auto flex max-w-3xl flex-col gap-4">
                        {pttArticles?.map((article) => (
                            <PttArticleCard key={article.link} article={article} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="bbc">
                    <SectionTitle title="BBC中文新聞" />
                    <div className="mx-auto flex max-w-3xl flex-col gap-4">
                        {bbcArticles?.map((article) => (
                            <BbcArticleCard key={article.guid} article={article} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="google">
                    <SectionTitle title="過去4小時" />
                    <div className="mx-auto flex max-w-xl flex-col gap-4">
                        {googleTrends?.map((trend) => (
                            <GoogleTrendCard key={trend.googleTrend} trend={trend} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="gamer">
                    <GamerContent
                        allTrends={gamerAllTrends}
                        gameTrends={gamerGameTrends}
                        acTrends={gamerAcTrends}
                        lifeTrends={gamerLifeTrends}
                    />
                </TabsContent>
                <TabsContent value="reddit">
                    <RedditContent
                        allArticles={redditAllArticles}
                        taiwaneseArticles={redditTaiwaneseArticles}
                        chinaIrlArticles={redditChinaIrlArticles}
                    />
                </TabsContent>
                <TabsContent value="komica">
                    <KomicaList className="mx-auto max-w-xl" trends={komicaTrends} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Home;
