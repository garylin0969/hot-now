'use client';

import { useEffect } from 'react';

const IframePotMessage = () => {
    useEffect(() => {
        // 假設當你資料載入完成時
        window?.parent?.postMessage({ type: 'HOT_NOW_READY' }, '*');
    }, []);
    return null;
};

export default IframePotMessage;
