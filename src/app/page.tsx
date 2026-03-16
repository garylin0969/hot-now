/**
 * @fileoverview 應用程式首頁 (Home Page)
 * 整合多個內容平台熱門話題的標籤頁介面。
 */
import BbcContent from '@/components/organisms/bbc-content';
import GamerContent from '@/components/organisms/gamer-content';
import GoogleContent from '@/components/organisms/google-content';
import HomeTabs from '@/components/organisms/home-tabs';
import KomicaContent from '@/components/organisms/komica-content';
import PttContent from '@/components/organisms/ptt-content';
import Shortcuts from '@/components/organisms/shortcuts';
import YouTubeContent from '@/components/organisms/youtube-content';
import { TabsContent } from '@/components/ui/tabs';
import { getHomePageData } from '@/services/home-data';

/**
 * 首頁元件
 * 負責渲染頂部快捷方式、主要內容標籤頁及其對應的平台內容區塊。
 * 首頁資料由單一聚合函式取得，再分派給各展示型內容元件。
 */
const Home = async () => {
    /** 首頁一次性聚合資料，供所有平台頁籤共用。 */
    const homeData = await getHomePageData();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="sr-only">Hot Now - 熱門話題整合平台</h1>
            <div className="mb-4 flex justify-center">
                <Shortcuts />
            </div>
            <HomeTabs>
                <TabsContent value="youtube">
                    <YouTubeContent videos={homeData.youtube} />
                </TabsContent>
                <TabsContent value="ptt">
                    <PttContent articles={homeData.ptt} />
                </TabsContent>
                <TabsContent value="bbc">
                    <BbcContent articles={homeData.bbc} />
                </TabsContent>
                <TabsContent value="google">
                    <GoogleContent trends={homeData.google} />
                </TabsContent>
                <TabsContent value="gamer">
                    <GamerContent trendsByCategory={homeData.gamer} />
                </TabsContent>
                <TabsContent value="komica">
                    <KomicaContent articles={homeData.komica} />
                </TabsContent>
            </HomeTabs>
        </div>
    );
};

export default Home;
