/**
 * @fileoverview Google Trends 相關型別定義
 */

/** Google 搜尋趨勢項目 */
export interface GoogleTrend {
    /** 趨勢關鍵字 */
    googleTrend: string;
    /** 搜尋量 (例如: "10K+") */
    searchVolume: string;
    /** 開始時間 */
    started: string;
}

/** Google Trends API 回應格式 */
export interface GoogleApiResponse {
    /** 資料更新時間 */
    updated: string;
    /** 趨勢列表 */
    trends: GoogleTrend[];
}
