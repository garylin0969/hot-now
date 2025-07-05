import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // 根據官方 PWA 指南添加安全性標頭
    async headers() {
        return [
            {
                // 全域標頭（應用於所有路由）
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff', // 防止 MIME 類型嗅探，降低惡意文件上傳風險
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin', // 控制引用資訊的傳遞，平衡安全性和功能性
                    },
                ],
            },
            {
                // Service Worker 特定標頭
                source: '/sw.js',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/javascript; charset=utf-8', // 確保 Service Worker 正確解析為 JavaScript
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate', // 防止 Service Worker 快取，確保使用者總是獲得最新版本
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self'", // 嚴格的內容安全政策，只允許同源腳本
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
