export interface PttArticle {
    recommendScore: string;
    recommendCount: string;
    title: string;
    link: string;
    author: string;
    board: string;
    publishTime: string;
    imageUrl: string;
}

export interface PttApiResponse {
    updated: string;
    total_found: number;
    returned_count: number;
    articles: PttArticle[];
}
