/**
 * @fileoverview 巴哈姆特 (Gamer) 相關型別定義
 */

/** 巴哈姆特熱門趨勢文章 */
export interface GamerTrend {
    /** 是否來自看板 */
    fromBoard: boolean;
    /** 看板編號 (Board Serial Number) */
    bsn: number;
    /** 文章編號 (Serial Number A) */
    snA: number;
    /** 看板圖示 URL */
    propic: string;
    /** 看板名稱 */
    name: string;
    /** 子看板編號 */
    subbsn: number;
    /** 子看板標題 */
    subbtitle: string;
    /** 發文時間 */
    postTime: string;
    /** 最後回覆時間 */
    wtime: string;
    /** 使用者 ID */
    userid: string;
    /** 文章標題 */
    title: string;
    /** 文章摘要 */
    summary: string;
    /** 縮圖 URL */
    thumbnail: string;
    /** 互動數據 */
    interaction: {
        /** 推 (GP) 數量 */
        gp: string;
        /** 噓 (BP) 數量 */
        bp: string;
        /** 其他互動 (如留言) 數量 */
        others: number;
    };
    /** 總數量 (用途不明，可能與排序有關) */
    tnum: number;
}

/** 巴哈姆特 API 回應格式 */
export interface GamerApiResponse {
    /** 分類資料 */
    data: {
        /** 遊戲類熱門文章 */
        game: GamerTrend[];
        /** 動漫類熱門文章 */
        ac: GamerTrend[];
        /** 生活類熱門文章 */
        life: GamerTrend[];
        /** 所有類別熱門文章 */
        all: GamerTrend[];
    };
}
