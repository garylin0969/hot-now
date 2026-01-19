/**
 * @fileoverview Komica API 服務
 * 通過爬蟲源獲取 Komica (K島) 熱門文章。
 */
import { fetchFromScraper } from '@/services/api-client';
import type { KomicaApiResponse } from '@/types';

/**
 * 獲取 Komica 熱門文章 (爬蟲資料)
 *
 * @returns 包含文章資料的 Promise 物件
 */
export const GetKomicaTrends = async (): Promise<KomicaApiResponse> => {
    return fetchFromScraper<KomicaApiResponse>('komica-trends.json');
};
