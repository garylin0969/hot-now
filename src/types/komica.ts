export interface KomicaTrend {
    replyCount: number;
    date: string;
    time: string;
    title: string;
    description: string;
    link: string;
    rawText: string;
}

export interface KomicaApiResponse {
    updated: string;
    trends: KomicaTrend[];
}
