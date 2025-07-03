import type { KomicaApiResponse } from '@/types';

// KOMICA API URL
const KOMICA_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

// K島熱門文章
export const GetKomicaTrends = async (): Promise<KomicaApiResponse> => {
    try {
        const response = await fetch(`${KOMICA_BASE_URL}/komica-trends.json`, {
            next: {
                revalidate: 60 * 30, // 30 minutes
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Komica trends:', error);
        throw new Error(`Failed to fetch Komica trends: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
