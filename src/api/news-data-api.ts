import type { NewsDataApiResponse, SimplifiedNews } from '@/types';

// NewsData API Key
const NEWS_DATA_API_KEY = String(process.env.NEXT_PRIVATE_NEWSDATA_API_KEY);
// NewsData Base URL
const NEWS_DATA_BASE_URL = 'https://www.newsdata.io/api/1';

// 轉換新聞數據為簡化格式
const simplifyNewsData = (apiResponse: NewsDataApiResponse): SimplifiedNews[] => {
    return apiResponse.results.map((news) => ({
        article_id: news.article_id,
        title: news.title,
        link: news.link,
        description: news.description,
        pubDate: news.pubDate,
        image_url: news.image_url,
        source_name: news.source_name,
        source_icon: news.source_icon,
        category: news.category,
    }));
};

// 取得熱門新聞
export const GetNewsDataHotNews = async (limit: number = 10): Promise<NewsDataApiResponse> => {
    const response = await fetch(
        `${NEWS_DATA_BASE_URL}/latest?apikey=${NEWS_DATA_API_KEY}&country=tw&language=zh&size=${limit}&timezone=Asia/Taipei`,
        { next: { revalidate: 60 * 60 * 2 } }
    );
    const data = await response.json();
    return data;
};

// 取得簡化的熱門新聞
export const GetSimplifiedNewsDataHotNews = async (limit: number = 10): Promise<SimplifiedNews[]> => {
    const apiResponse = await GetNewsDataHotNews(limit);
    return simplifyNewsData(apiResponse);
};
