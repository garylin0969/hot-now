/**
 * @fileoverview BBC 新聞相關型別定義
 */

/** BBC 新聞頻道資訊 */
export interface BbcChannel {
    /** 頻道標題 */
    title: string;
    /** 頻道描述 */
    description: string;
    /** 頻道連結 */
    link: string;
    /** 最後更新時間 */
    lastBuildDate: string;
    /** 語言 */
    language: string;
    /** 版權聲明 */
    copyright: string;
}

/** BBC 新聞文章 */
export interface BbcArticle {
    /** 文章標題 */
    title: string;
    /** 文章描述 (摘要) */
    description: string;
    /** 文章連結 */
    link: string;
    /** 發布日期 */
    pubDate: string;
    /** 唯一識別碼 */
    guid: string;
    /** 縮圖 URL */
    thumbnail: string;
}

/** BBC API 回應格式 */
export interface BbcApiResponse {
    /** 資料更新時間 */
    updated: string;
    /** 頻道資訊 */
    channel: BbcChannel;
    /** 熱門趨勢文章列表 */
    trends: BbcArticle[];
}
