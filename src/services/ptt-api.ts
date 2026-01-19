/**
 * @fileoverview PTT API 服務
 * 通過爬蟲源獲取 PTT 熱門文章。
 */
import { fetchFromScraper } from '@/services/api-client';
import type { PttApiResponse } from '@/types';

/**
 * 獲取 PTT 熱門文章 (爬蟲資料)
 *
 * @returns 包含文章資料的 Promise 物件
 */
export const GetPttTrends = async (): Promise<PttApiResponse> => {
    return fetchFromScraper<PttApiResponse>('ptt-trends.json');
};
