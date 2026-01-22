/**
 * @fileoverview YouTube API 類型定義
 */

export interface YouTubeThumbnail {
    url: string;
    width?: number;
    height?: number;
}

export interface YouTubeThumbnails {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
}

export interface YouTubeVideoSnippet {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: YouTubeThumbnails;
    channelTitle?: string;
    tags?: string[];
    categoryId?: string;
    liveBroadcastContent?: string;
    defaultLanguage?: string;
    localized?: {
        title: string;
        description: string;
    };
    defaultAudioLanguage?: string;
}

export interface YouTubeVideoStatistics {
    viewCount?: string;
    likeCount?: string;
    dislikeCount?: string;
    favoriteCount?: string;
    commentCount?: string;
}

export interface YouTubeVideoContentDetails {
    duration?: string;
    dimension?: string;
    definition?: string;
    caption?: string;
    licensedContent?: boolean;
    regionRestriction?: {
        allowed?: string[];
        blocked?: string[];
    };
    contentRating?: Record<string, string>;
    projection?: string;
}

export interface YouTubeVideo {
    kind?: string;
    etag?: string;
    id?: string;
    snippet?: YouTubeVideoSnippet;
    contentDetails?: YouTubeVideoContentDetails;
    statistics?: YouTubeVideoStatistics;
}

export interface YouTubeApiResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YouTubeVideo[];
}
