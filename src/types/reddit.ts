/**
 * @fileoverview Reddit 相關型別定義
 */

/** Reddit 預覽圖片資訊 */
export interface RedditPreviewImage {
    /** 圖片 URL */
    url: string;
    /** 寬度 */
    width: number;
    /** 高度 */
    height: number;
}

/** Reddit 預覽資料結構 */
export interface RedditPreview {
    /** 圖片列表 */
    images: Array<{
        /** 原始圖片 */
        source: RedditPreviewImage;
        /** 不同解析度的版本 */
        resolutions: RedditPreviewImage[];
        /** 變體 (如 GIF, MP4 等) */
        variants: Record<string, unknown>;
        /** 圖片 ID */
        id: string;
    }>;
    /** 是否啟用預覽 */
    enabled: boolean;
}

/** Reddit 文章詳細資料 (原始 API 結構) */
export interface RedditArticleData {
    approved_at_utc: null;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: null;
    gilded: number;
    clicked: boolean;
    title: string;
    link_flair_richtext: unknown[];
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    link_flair_css_class: null;
    downs: number;
    thumbnail_height: number;
    top_awarded_type: null;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color: string;
    upvote_ratio: number;
    author_flair_background_color: null;
    subreddit_type: string;
    ups: number;
    total_awards_received: number;
    media_embed: Record<string, unknown>;
    thumbnail_width: number;
    author_flair_template_id: null;
    is_original_content: boolean;
    user_reports: unknown[];
    secure_media: null;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category: null;
    secure_media_embed: Record<string, unknown>;
    link_flair_text: null;
    can_mod_post: boolean;
    score: number;
    approved_by: null;
    is_created_from_ads_ui: boolean;
    author_premium: boolean;
    thumbnail: string;
    edited: boolean;
    author_flair_css_class: null;
    author_flair_richtext: unknown[];
    gildings: Record<string, unknown>;
    post_hint: string;
    content_categories: null;
    is_self: boolean;
    mod_note: null;
    created: number;
    link_flair_type: string;
    wls: number;
    removed_by_category: null;
    banned_by: null;
    author_flair_type: string;
    domain: string;
    allow_live_comments: boolean;
    selftext_html: null;
    likes: null;
    suggested_sort: null;
    banned_at_utc: null;
    url_overridden_by_dest?: string;
    view_count: null;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    preview?: RedditPreview;
    all_awardings: unknown[];
    awarders: unknown[];
    media_only: boolean;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text: null;
    treatment_tags: unknown[];
    visited: boolean;
    removed_by: null;
    num_reports: null;
    distinguished: null;
    subreddit_id: string;
    author_is_blocked: boolean;
    mod_reason_by: null;
    removal_reason: null;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    report_reasons: null;
    author: string;
    discussion_type: null;
    num_comments: number;
    send_replies: boolean;
    contest_mode: boolean;
    mod_reports: unknown[];
    author_patreon_flair: boolean;
    author_flair_text_color: null;
    permalink: string;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    media: null;
    is_video: boolean;
}

/** Reddit 文章容器 */
export interface RedditArticle {
    /** 資料類型 (例如 't3' 代表文章) */
    kind: 't3';
    /** 文章內容資料 */
    data: RedditArticleData;
}

/** Reddit 列表資料結構 */
export interface RedditListingData {
    /** 下一頁的錨點 */
    after: string | null;
    /** 數量 */
    dist: number;
    /** Mod hash */
    modhash: string;
    /** 地理過濾器 */
    geo_filter: null;
    /** 子項目列表 (文章) */
    children: RedditArticle[];
    /** 上一頁的錨點 */
    before: null;
}

/** Reddit API 回應格式 */
export interface RedditApiResponse {
    /** 回應類型 (通常為 'Listing') */
    kind: 'Listing';
    /** 回應資料 */
    data: RedditListingData;
}

/** 簡化後的 Reddit 文章資料格式 (前端顯示用) */
export interface SimplifiedRedditArticle {
    /** 文章 ID */
    id: string;
    /** 文章標題 */
    title: string;
    /** 作者名稱 */
    author: string;
    /** 子版塊名稱 */
    subreddit: string;
    /** 分數 (推 - 噓) */
    score: number;
    /** 留言數 */
    num_comments: number;
    /** 外部連結 URL */
    url: string;
    /** 縮圖 URL */
    thumbnail: string;
    /** 建立時間 (UTC Timestamp, 秒) */
    created_utc: number;
    /** 文章永久連結 (相對路徑) */
    permalink: string;
    /** 是否為影片 */
    is_video: boolean;
    /** 預覽圖片 URL (若有) */
    preview_image?: string;
}
