// Gamer API 回應格式的型別定義
export interface GamerTrend {
    fromBoard: boolean;
    bsn: number;
    snA: number;
    propic: string;
    name: string;
    subbsn: number;
    subbtitle: string;
    postTime: string;
    wtime: string;
    userid: string;
    title: string;
    summary: string;
    thumbnail: string;
    interaction: {
        gp: string;
        bp: string;
        others: number;
    };
    tnum: number;
}

export interface GamerApiResponse {
    data: {
        game: GamerTrend[];
        ac: GamerTrend[];
        life: GamerTrend[];
        all: GamerTrend[];
    };
}
