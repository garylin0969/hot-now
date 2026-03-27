import type { GamerApiResponse } from '@/types';

// Gamer API URL
const GAMER_API_URL = 'https://api.gamer.com.tw/www/v1/forum_hot_post.php';

// Gamer 熱門文章
export const GetGamerTrends = async (): Promise<GamerApiResponse> => {
    try {
        const response = await fetch(GAMER_API_URL, {
            next: {
                revalidate: 60 * 60, // 60 minutes
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Gamer trends:', error);
        throw new Error(`Failed to fetch Gamer trends: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
