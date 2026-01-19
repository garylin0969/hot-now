/**
 * @fileoverview 應用程式首頁 (Home Page)
 * 整合多個內容平台熱門話題的標籤頁介面。
 */
import { Suspense } from 'react';
import BbcContent from '@/components/organisms/bbc-content';
import GamerContent from '@/components/organisms/gamer-content';
import GoogleContent from '@/components/organisms/google-content';
import HomeTabs from '@/components/organisms/home-tabs';
import KomicaContent from '@/components/organisms/komica-content';
import PttContent from '@/components/organisms/ptt-content';
import RedditContent from '@/components/organisms/reddit-content';
import Shortcuts from '@/components/organisms/shortcuts';
import YouTubeContent from '@/components/organisms/youtube-content';
import { Skeleton } from '@/components/ui/skeleton';
import { TabsContent } from '@/components/ui/tabs';

/**
 * 標籤頁內容的加載佔位元件 (Skeleton)
 *
 * @returns 模擬文章列表結構的脈衝動畫元件
 */
const TabSkeleton = () => (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3 rounded-lg border p-4 shadow-sm">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        ))}
    </div>
);

/** 頁籤配置設定 */
const TABS_CONFIG = [
    { value: 'youtube', Component: YouTubeContent },
    { value: 'ptt', Component: PttContent },
    { value: 'bbc', Component: BbcContent },
    { value: 'google', Component: GoogleContent },
    { value: 'gamer', Component: GamerContent },
    { value: 'reddit', Component: RedditContent },
    { value: 'komica', Component: KomicaContent },
] as const;

/**
 * 首頁元件
 * 負責渲染頂部快捷方式、主要內容標籤頁及其對應的平台內容區塊。
 * 內容由 Server Component 渲染，只有 Tabs UI 控制在 Client Component 中。
 */
const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="sr-only">Hot Now - 熱門話題整合平台</h1>
            <div className="mb-4 flex justify-center">
                <Shortcuts />
            </div>
            <HomeTabs>
                {TABS_CONFIG.map(({ value, Component }) => (
                    <TabsContent key={value} value={value}>
                        <Suspense fallback={<TabSkeleton />}>
                            <Component />
                        </Suspense>
                    </TabsContent>
                ))}
            </HomeTabs>
        </div>
    );
};

export default Home;