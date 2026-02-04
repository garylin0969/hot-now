/**
 * @fileoverview 巴哈姆特 API 服務
 * 直接獲取巴哈姆特哈啦區熱門文章。
 */
import type { GamerApiResponse } from '@/types';

/** 巴哈姆特熱門文章 API URL */
const GAMER_API_URL = 'https://api.gamer.com.tw/www/v1/forum_hot_post.php';

/**
 * 獲獲取巴哈姆特熱門文章
 *
 * @returns 包含巴哈姆特 API 回應的 Promise 物件
 * @throws {Error} 當請求失敗時拋出錯誤
 */
export const GetGamerTrends = async (): Promise<GamerApiResponse> => {
    const response = await fetch(GAMER_API_URL, {
        next: {
            revalidate: 1800, // 30 分鐘
            tags: ['gamer-data'], // 統一快取標籤
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};
