// Hot Now - Service Worker
// 基於 Next.js 15 官方 PWA 指南實現，配合 ISR 設定優化

const CACHE_NAME = 'hot-now-cache-v2';
const STATIC_CACHE_NAME = 'hot-now-static-v2';
const API_CACHE_NAME = 'hot-now-api-v2';

// 需要快取的靜態資源
const STATIC_ASSETS = [
    '/',
    '/favicon/android-chrome-192x192.png',
    '/favicon/android-chrome-512x512.png',
    '/favicon/apple-touch-icon.png',
    '/favicon/favicon-16x16.png',
    '/favicon/favicon-32x32.png',
    '/favicon/favicon.ico',
    '/image-not-found.png',
];

// API 快取配置 - 配合 ISR 設定
const API_CACHE_CONFIG = {
    // PTT - ISR: 5分鐘, SW快取: 4分鐘
    ptt: {
        patterns: ['/ptt-trends.json'],
        maxAge: 4 * 60 * 1000, // 4分鐘
        strategy: 'stale-while-revalidate',
    },
    // Google 趨勢 - ISR: 30分鐘, SW快取: 25分鐘
    google: {
        patterns: ['/google-trends.json'],
        maxAge: 25 * 60 * 1000, // 25分鐘
        strategy: 'stale-while-revalidate',
    },
    // YouTube - ISR: 30分鐘, SW快取: 25分鐘
    youtube: {
        patterns: ['www.googleapis.com/youtube'],
        maxAge: 25 * 60 * 1000, // 25分鐘
        strategy: 'stale-while-revalidate',
    },
    // Gamer - ISR: 60分鐘, SW快取: 50分鐘
    gamer: {
        patterns: ['api.gamer.com.tw'],
        maxAge: 50 * 60 * 1000, // 50分鐘
        strategy: 'stale-while-revalidate',
    },
    // Reddit - ISR: 60分鐘, SW快取: 50分鐘
    reddit: {
        patterns: ['/reddit-all-hot.json', '/reddit-taiwanese-hot.json', '/reddit-china-irl-hot.json'],
        maxAge: 50 * 60 * 1000, // 50分鐘
        strategy: 'stale-while-revalidate',
    },
    // Komica - ISR: 30分鐘, SW快取: 25分鐘
    komica: {
        patterns: ['/komica-trends.json'],
        maxAge: 25 * 60 * 1000, // 25分鐘
        strategy: 'stale-while-revalidate',
    },
};

// 安裝 Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] 安裝中...');
    event.waitUntil(
        caches
            .open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log('[SW] 快取靜態資源');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] 安裝完成');
                return self.skipWaiting();
            })
    );
});

// 啟用 Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] 啟用中...');
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (
                            cacheName !== CACHE_NAME &&
                            cacheName !== STATIC_CACHE_NAME &&
                            cacheName !== API_CACHE_NAME
                        ) {
                            console.log('[SW] 刪除舊快取:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] 啟用完成');
                return self.clients.claim();
            })
    );
});

// 攔截網路請求
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // 只處理 HTTP/HTTPS 請求
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // 首頁 - StaleWhileRevalidate 策略
    if (url.pathname === '/') {
        event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
        return;
    }

    // API 請求 - 根據配置使用不同策略
    const apiConfig = getApiConfig(url);
    if (apiConfig) {
        event.respondWith(staleWhileRevalidateWithTTL(request, API_CACHE_NAME, apiConfig));
        return;
    }

    // 靜態資源 - CacheFirst 策略
    if (isStaticAsset(url)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
        return;
    }

    // 其他請求 - NetworkFirst 策略
    event.respondWith(networkFirst(request, CACHE_NAME));
});

// 取得 API 配置
function getApiConfig(url) {
    for (const [, config] of Object.entries(API_CACHE_CONFIG)) {
        if (config.patterns.some((pattern) => url.href.includes(pattern) || url.pathname.includes(pattern))) {
            return config;
        }
    }
    return null;
}

// 判斷是否為靜態資源
function isStaticAsset(url) {
    return /\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/.test(url.pathname);
}

// StaleWhileRevalidate 策略（配合 TTL）
async function staleWhileRevalidateWithTTL(request, cacheName, config) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    // 檢查快取是否過期
    if (cachedResponse) {
        const cachedTime = cachedResponse.headers.get('sw-cached-time');
        if (cachedTime) {
            const age = Date.now() - parseInt(cachedTime);
            if (age < config.maxAge) {
                console.log(`[SW] 使用有效快取 (${Math.round(age / 1000)}秒前)`);
                // 背景更新（不等待結果）
                fetch(request)
                    .then((response) => {
                        if (response.ok) {
                            const responseClone = response.clone();
                            responseClone.headers.append('sw-cached-time', Date.now().toString());
                            cache.put(request, responseClone);
                        }
                    })
                    .catch(() => {});
                return cachedResponse;
            }
        }
    }

    // 快取過期或不存在，先網路請求
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            responseClone.headers.append('sw-cached-time', Date.now().toString());
            cache.put(request, responseClone);
            console.log(`[SW] 更新快取 (${config.maxAge / 60000}分鐘)`);
        }
        return networkResponse;
    } catch (error) {
        console.error('[SW] 網路請求失敗，返回舊快取:', error);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// 基本 StaleWhileRevalidate 策略
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    // 背景更新
    const networkResponsePromise = fetch(request)
        .then((response) => {
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => cachedResponse);

    // 立即返回快取或等待網路
    return cachedResponse || networkResponsePromise;
}

// CacheFirst 策略
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('[SW] 網路請求失敗:', error);
        throw error;
    }
}

// NetworkFirst 策略
async function networkFirst(request, cacheName) {
    const cache = await caches.open(cacheName);

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('[SW] 網路請求失敗，嘗試快取:', error);
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// 推播通知處理（為未來功能預留）
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/favicon/android-chrome-192x192.png',
            badge: '/favicon/android-chrome-192x192.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '1',
            },
        };
        event.waitUntil(self.registration.showNotification(data.title, options));
    }
});

// 通知點擊處理
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] 通知被點擊');
    event.notification.close();
    event.waitUntil(clients.openWindow('https://hotnow.garylin.dev'));
});
