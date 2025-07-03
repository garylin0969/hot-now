import type { PttApiResponse } from '@/types';

// PTT API Key
const PTT_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

export const GetPttTrends = async (): Promise<PttApiResponse> => {
    const response = await fetch(`${PTT_BASE_URL}/ptt-trends.json`);
    const data = await response.json();
    return data;
};
