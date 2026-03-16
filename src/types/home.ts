/**
 * @fileoverview 首頁聚合資料型別定義
 */
import type { BbcArticle } from './bbc';
import type { GamerApiResponse } from './gamer';
import type { GoogleTrend } from './google';
import type { KomicaTrend } from './komica';
import type { PttArticle } from './ptt';
import type { YouTubeVideo } from './youtube';

/** 首頁所需的全部平台資料。 */
export interface HomePageData {
    /** YouTube 各分類影片列表。 */
    youtube: {
        /** 最新發燒影片。 */
        latest: YouTubeVideo[];
        /** 遊戲分類發燒影片。 */
        gaming: YouTubeVideo[];
        /** 音樂分類發燒影片。 */
        music: YouTubeVideo[];
        /** 電影分類發燒影片。 */
        film: YouTubeVideo[];
    };
    /** PTT 熱門文章列表。 */
    ptt: PttArticle[];
    /** BBC 熱門新聞列表。 */
    bbc: BbcArticle[];
    /** Google 熱搜列表。 */
    google: GoogleTrend[];
    /** 巴哈姆特各分類熱門文章列表。 */
    gamer: GamerApiResponse['data'];
    /** Komica 熱門文章列表。 */
    komica: KomicaTrend[];
}
