export interface BbcChannel {
    title: string;
    description: string;
    link: string;
    lastBuildDate: string;
    language: string;
    copyright: string;
}

export interface BbcArticle {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    guid: string;
    thumbnail: string;
}

export interface BbcApiResponse {
    updated: string;
    channel: BbcChannel;
    trends: BbcArticle[];
}
