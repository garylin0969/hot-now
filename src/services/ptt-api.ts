import type { PttApiResponse } from '@/types';

// PTT API URL
const PTT_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

export const GetPttTrends = async (): Promise<PttApiResponse> => {
    try {
        const response = await fetch(`${PTT_BASE_URL}/ptt-trends.json`, {
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
        console.error('Error fetching PTT trends:', error);
        throw new Error(`Failed to fetch PTT trends: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
