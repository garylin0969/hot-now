/**
 * @fileoverview Google Trends API 服務
 * 通過爬蟲源獲取 Google 熱門搜尋趨勢。
 */
import { fetchFromScraper } from '@/services/api-client';
import type { GoogleApiResponse } from '@/types';

/**
 * 獲取 Google 熱門搜尋趨勢 (爬蟲資料)
 *
 * @returns 包含趨勢資料的 Promise 物件
 */
export const GetGoogleTrends = async (): Promise<GoogleApiResponse> => {
    return fetchFromScraper<GoogleApiResponse>('google-trends.json');
};
