const REDDIT_BASE_URL = 'https://www.reddit.com';

// Reddit API 回應格式的型別定義
interface RedditPreviewImage {
    url: string;
    width: number;
    height: number;
}

interface RedditPreview {
    images: Array<{
        source: RedditPreviewImage;
        resolutions: RedditPreviewImage[];
        variants: Record<string, unknown>;
        id: string;
    }>;
    enabled: boolean;
}

interface RedditPostData {
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

interface RedditPost {
    kind: 't3';
    data: RedditPostData;
}

interface RedditListingData {
    after: string | null;
    dist: number;
    modhash: string;
    geo_filter: null;
    children: RedditPost[];
    before: null;
}

interface RedditApiResponse {
    kind: 'Listing';
    data: RedditListingData;
}

// 簡化的文章資料格式
export interface SimplifiedRedditPost {
    id: string;
    title: string;
    author: string;
    subreddit: string;
    score: number;
    num_comments: number;
    url: string;
    thumbnail: string;
    created_utc: number;
    permalink: string;
    is_video: boolean;
    preview_image?: string;
}

// Reddit所有看版的熱門文章
export const GetRedditHotPosts = async (limit: number = 50): Promise<RedditApiResponse> => {
    const response = await fetch(`${REDDIT_BASE_URL}/r/all/hot.json?limit=${limit}`, {
        cache: 'no-store',
    });
    const data: RedditApiResponse = await response.json();
    return data;
};

// 取得簡化的Reddit熱門文章資料
export const GetSimplifiedRedditHotPosts = async (limit: number = 50): Promise<SimplifiedRedditPost[]> => {
    const data = await GetRedditHotPosts(limit);

    return data.data.children.map((post) => ({
        id: post.data.id,
        title: post.data.title,
        author: post.data.author,
        subreddit: post.data.subreddit,
        score: post.data.score,
        num_comments: post.data.num_comments,
        url: post.data.url,
        thumbnail: post.data.thumbnail,
        created_utc: post.data.created_utc,
        permalink: post.data.permalink,
        is_video: post.data.is_video,
        preview_image: post.data.preview?.images[0]?.source?.url,
    }));
};
