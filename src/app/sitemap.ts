/**
 * @fileoverview Sitemap.xml 生成器
 */
import { MetadataRoute } from 'next';

/**
 * 生成網站地圖 (Sitemap)
 * 包含首頁與隱私權政策頁面的 URL、更新頻率與權重。
 *
 * @returns Sitemap 設定陣列
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://hotnow.garylin.dev';
    const currentDate = new Date();

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'hourly',
            priority: 1,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];
}
