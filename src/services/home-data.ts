/**
 * @fileoverview 首頁聚合資料服務
 * 將首頁所需的所有遠端資料集中在單一入口抓取與快取。
 */
import { cacheLife } from 'next/cache';
import type { YouTubeCategoryKey } from '@/constants/youtube';
import { GetBbcTrends } from '@/services/bbc-api';
import { GetGamerTrends } from '@/services/gamer-api';
import { GetGoogleTrends } from '@/services/google-api';
import { GetKomicaTrends } from '@/services/komica-api';
import { GetPttTrends } from '@/services/ptt-api';
import { GetYoutubeHotVideos, GetYoutubeHotVideosByCategory } from '@/services/youtube-api';
import type { HomePageData } from '@/types';

type HomeDataDependencies = {
    /** 取得 YouTube 最新發燒影片。 */
    getYoutubeHotVideos: typeof GetYoutubeHotVideos;
    /** 依分類取得 YouTube 發燒影片。 */
    getYoutubeHotVideosByCategory: typeof GetYoutubeHotVideosByCategory;
    /** 取得 PTT 熱門文章。 */
    getPttTrends: typeof GetPttTrends;
    /** 取得 BBC 熱門新聞。 */
    getBbcTrends: typeof GetBbcTrends;
    /** 取得 Google 熱搜資料。 */
    getGoogleTrends: typeof GetGoogleTrends;
    /** 取得巴哈姆特熱門文章。 */
    getGamerTrends: typeof GetGamerTrends;
    /** 取得 Komica 熱門文章。 */
    getKomicaTrends: typeof GetKomicaTrends;
};

/** 預設首頁資料依賴，供正式環境使用。 */
const defaultDependencies: HomeDataDependencies = {
    getYoutubeHotVideos: GetYoutubeHotVideos,
    getYoutubeHotVideosByCategory: GetYoutubeHotVideosByCategory,
    getPttTrends: GetPttTrends,
    getBbcTrends: GetBbcTrends,
    getGoogleTrends: GetGoogleTrends,
    getGamerTrends: GetGamerTrends,
    getKomicaTrends: GetKomicaTrends,
};

/**
 * 載入首頁所需的全部資料。
 *
 * @param dependencies - 可注入的資料來源依賴，主要供測試使用
 * @returns 首頁各平台資料的聚合結果
 */
export const loadHomePageData = async (
    dependencies: HomeDataDependencies = defaultDependencies
): Promise<HomePageData> => {
    const [
        latestResponse,
        gamingResponse,
        musicResponse,
        filmResponse,
        pttResponse,
        bbcResponse,
        googleResponse,
        gamerResponse,
        komicaResponse,
    ] = await Promise.all([
        dependencies.getYoutubeHotVideos(),
        dependencies.getYoutubeHotVideosByCategory('gaming' satisfies YouTubeCategoryKey),
        dependencies.getYoutubeHotVideosByCategory('music' satisfies YouTubeCategoryKey),
        dependencies.getYoutubeHotVideosByCategory('film' satisfies YouTubeCategoryKey),
        dependencies.getPttTrends(),
        dependencies.getBbcTrends(),
        dependencies.getGoogleTrends(),
        dependencies.getGamerTrends(),
        dependencies.getKomicaTrends(),
    ]);

    return {
        youtube: {
            latest: latestResponse.items || [],
            gaming: gamingResponse.items || [],
            music: musicResponse.items || [],
            film: filmResponse.items || [],
        },
        ptt: pttResponse.articles || [],
        bbc: bbcResponse.trends || [],
        google: googleResponse.trends || [],
        gamer: gamerResponse.data || {
            all: [],
            game: [],
            ac: [],
            life: [],
        },
        komica: komicaResponse.trends || [],
    };
};

/**
 * 取得首頁聚合資料的快取包裝函式。
 *
 * @returns 套用首頁快取策略後的聚合資料
 */
export const getHomePageData = async (): Promise<HomePageData> => {
    'use cache';
    cacheLife('halfHour');

    return loadHomePageData();
};
