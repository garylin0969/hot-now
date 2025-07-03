import type { KomicaApiResponse } from '@/types';

// KOMICA API Key
const KOMICA_BASE_URL = String(process.env.NEXT_PUBLIC_GITHUB_REPO_URL);

// K島熱門文章
export const GetKomicaTrends = async (): Promise<KomicaApiResponse> => {
    const response = await fetch(`${KOMICA_BASE_URL}/komica-trends.json`, {
        next: {
            revalidate: 60 * 30, // 30 minutes
        },
    });
    const data = await response.json();
    return data;
};
