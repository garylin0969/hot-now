/**
 * @fileoverview Komica (K島) 相關型別定義
 */

/** Komica 熱門趨勢文章 */
export interface KomicaTrend {
    /** 回覆數量 */
    replyCount: number;
    /** 日期 */
    date: string;
    /** 時間 */
    time: string;
    /** 標題 */
    title: string;
    /** 描述 (通常為內文摘要) */
    description: string;
    /** 文章連結 */
    link: string;
    /** 原始文字內容 */
    rawText: string;
}

/** Komica API 回應格式 */
export interface KomicaApiResponse {
    /** 資料更新時間 */
    updated: string;
    /** 趨勢列表 */
    trends: KomicaTrend[];
}
