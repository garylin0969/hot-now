import type { BbcApiResponse } from '@/types';

// BBC API URL
const BBC_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

export const GetBbcTrends = async (): Promise<BbcApiResponse> => {
    try {
        const response = await fetch(`${BBC_BASE_URL}/bbc-trends.json`, {
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
        console.error('Error fetching BBC trends:', error);
        throw new Error(`Failed to fetch BBC trends: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
