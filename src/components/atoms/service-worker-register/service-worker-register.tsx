'use client';

import { useEffect } from 'react';

/**
 * Service Worker 註冊元件
 * 基於 Next.js 15 官方 PWA 指南實作
 * 用於在客戶端自動註冊 Service Worker
 */
const ServiceWorkerRegister = () => {
    useEffect(() => {
        // 檢查瀏覽器是否支援 Service Worker
        if ('serviceWorker' in navigator) {
            // 註冊 Service Worker
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log('✅ Service Worker 註冊成功:', registration.scope);

                    // 檢查是否有新版本
                    registration.addEventListener('updatefound', () => {
                        console.log('🔄 發現新版本，正在安裝...');
                        const newWorker = registration.installing;

                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed') {
                                    if (navigator.serviceWorker.controller) {
                                        console.log('✅ 新版本已安裝，頁面重新載入後生效');
                                        // 可以在這裡顯示通知給使用者
                                    } else {
                                        console.log('✅ Service Worker 已安裝，離線功能可用');
                                    }
                                }
                            });
                        }
                    });

                    // 監聽 Service Worker 控制器變化
                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                        console.log('🔄 Service Worker 控制器已更新');
                    });
                })
                .catch((error) => {
                    console.error('❌ Service Worker 註冊失敗:', error);
                });
        } else {
            console.warn('⚠️ 此瀏覽器不支援 Service Worker');
        }
    }, []);

    // 此元件不渲染任何內容
    return null;
};

export default ServiceWorkerRegister;
