import type { GoogleApiResponse } from '@/types';

// GOOGLE API Key
const GOOGLE_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

// Google Trends
export const GetGoogleTrends = async (): Promise<GoogleApiResponse> => {
    const response = await fetch(`${GOOGLE_BASE_URL}/google-trends.json`, {
        next: {
            revalidate: 60 * 30, // 30 minutes
        },
    });
    const data = await response.json();
    return data;
};
