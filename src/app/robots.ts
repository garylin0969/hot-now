/**
 * @fileoverview Robots.txt 生成器
 */
import { MetadataRoute } from 'next';

/**
 * 生成 robots.txt 配置
 * 允許所有搜尋引擎索引，並指向 sitemap。
 *
 * @returns Robots 配置物件
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [],
        },
        sitemap: 'https://hotnow.garylin.dev/sitemap.xml',
    };
}
