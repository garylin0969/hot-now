'use client';

/**
 * @fileoverview Iframe 通訊元件
 */
import { useEffect } from 'react';

/**
 * Iframe PostMessage 通訊元件
 * 用於向父視窗發送應用程式已就緒的訊息，通常用於被嵌入 Iframe 的場景。
 *
 * @returns 不渲染任何 UI 內容 (null)
 */
const IframePostMessage = () => {
    useEffect(() => {
        // 假設當你資料載入完成時
        window?.parent?.postMessage({ type: 'HOT_NOW_READY' }, '*');
    }, []);
    return null;
};

export default IframePostMessage;
