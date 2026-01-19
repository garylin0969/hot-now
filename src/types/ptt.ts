/**
 * @fileoverview PTT 相關型別定義
 */

/** PTT 文章 */
export interface PttArticle {
    /** 推薦分數 (推文數 - 噓文數) */
    recommendScore: string;
    /** 推薦總數 (僅計算推文) */
    recommendCount: string;
    /** 文章標題 */
    title: string;
    /** 文章連結 (相對路徑) */
    link: string;
    /** 作者 ID */
    author: string;
    /** 看板名稱 */
    board: string;
    /** 發布時間 */
    publishTime: string;
    /** 預覽圖 URL (若有) */
    imageUrl: string;
}

/** PTT API 回應格式 */
export interface PttApiResponse {
    /** 資料更新時間 */
    updated: string;
    /** 總尋獲數量 */
    total_found: number;
    /** 回傳數量 */
    returned_count: number;
    /** 文章列表 */
    articles: PttArticle[];
}
