import type { GamerApiResponse } from '@/types';

// Gamer API URL
const GAMER_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

// Gamer 熱門文章
export const GetGamerTrends = async (): Promise<GamerApiResponse> => {
    try {
        const response = await fetch(`${GAMER_BASE_URL}/gamer-trends.json`, {
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
