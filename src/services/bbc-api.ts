/**
 * @fileoverview BBC 新聞 API 服務
 * 通過爬蟲源獲取 BBC 中文新聞趨勢。
 */
import { fetchFromScraper } from '@/services/api-client';
import type { BbcApiResponse } from '@/types';

/**
 * 獲取 BBC 熱門新聞 (爬蟲資料)
 *
 * @returns 包含新聞趨勢資料的 Promise 物件
 */
export const GetBbcTrends = async (): Promise<BbcApiResponse> => {
    return fetchFromScraper<BbcApiResponse>('bbc-trends.json');
};
