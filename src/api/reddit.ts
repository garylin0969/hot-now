const REDDIT_BASE_URL = 'https://www.reddit.com';

export const GetRedditHotPosts = async (limit: number = 50) => {
    const response = await fetch(`${REDDIT_BASE_URL}/r/all/hot.json?limit=${limit}`);
    const data = await response.json();
    return data;
};
