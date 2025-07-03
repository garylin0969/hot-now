// Gamer API 回應格式的型別定義
export interface GamerTrend {
    boardName: string;
    boardImage: string;
    subBoard: string;
    title: string;
    content: string;
    articleImage: string;
    gp: number;
    bp: number;
    comments: number;
    link: string;
    author: string;
}

export interface GamerApiResponse {
    updated: string;
    trends: GamerTrend[];
}
