// NewsData API 回應格式的型別定義
export interface NewsDataResult {
    article_id: string;
    title: string;
    link: string;
    keywords: string[] | null;
    creator: string[] | null;
    description: string | null;
    content: string;
    pubDate: string;
    pubDateTZ: string;
    image_url: string | null;
    video_url: string | null;
    source_id: string;
    source_name: string;
    source_priority: number;
    source_url: string;
    source_icon: string;
    language: string;
    country: string[];
    category: string[];
    sentiment: string;
    sentiment_stats: string;
    ai_tag: string;
    ai_region: string;
    ai_org: string;
    duplicate: boolean;
}

export interface NewsDataApiResponse {
    status: string;
    totalResults: number;
    results: NewsDataResult[];
    nextPage?: string;
}

// 簡化的新聞資料格式
export interface SimplifiedNews {
    article_id: string;
    title: string;
    link: string;
    description: string | null;
    pubDate: string;
    image_url: string | null;
    source_name: string;
    source_icon: string;
    category: string[];
}
