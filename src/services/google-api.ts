import type { GoogleApiResponse } from '@/types';

// GOOGLE API Key
const GOOGLE_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

// Google Trends
export const GetGoogleTrends = async (): Promise<GoogleApiResponse> => {
    try {
        const response = await fetch(`${GOOGLE_BASE_URL}/google-trends.json`, {
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
        console.error('Error fetching Google trends:', error);
        throw new Error(`Failed to fetch Google trends: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
