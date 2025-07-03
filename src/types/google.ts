export interface GoogleTrend {
    googleTrend: string;
    searchVolume: string;
    started: string;
}

export interface GoogleApiResponse {
    updated: string;
    trends: GoogleTrend[];
}
