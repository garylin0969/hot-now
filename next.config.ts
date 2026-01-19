import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // 啟用 React Compiler
    reactCompiler: true,
    // 啟用 Cache Components
    cacheComponents: true,
    // 自訂快取設定
    cacheLife: {
        // 30 分鐘快取設定（用於 Google、BBC、PTT、Komica、YouTube 等 API）
        halfHour: {
            stale: 60 * 30, // 30 分鐘內可使用 stale 資料
            revalidate: 60 * 30, // 30 分鐘後重新驗證
            expire: 60 * 60, // 1 小時後完全過期
        },
    },
};

export default nextConfig;
