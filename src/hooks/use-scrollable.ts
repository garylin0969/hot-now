/**
 * @fileoverview 可滾動容器邏輯 Hook
 */
import { useRef, useState, useEffect } from 'react';

/**
 * 管理橫向滾動容器狀態的 Hook
 * 自動偵測是否需要顯示左右箭頭，並提供滾動方法。
 *
 * @returns 包含 ref、狀態與滾動方法的物件
 */
export const useScrollable = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    /**
     * 檢查滾動位置並更新箭頭顯示狀態
     */
    const checkScrollPosition = () => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        // 當滾動位置大於 0 時顯示左箭頭
        setShowLeftArrow(scrollLeft > 0);

        // 當還沒滾動到最右邊時顯示右箭頭 (容許 1px 誤差)
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    };

    /**
     * 向左平滑滾動
     */
    const scrollLeft = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: -120,
            behavior: 'smooth',
        });
    };

    /**
     * 向右平滑滾動
     */
    const scrollRight = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: 120,
            behavior: 'smooth',
        });
    };

    // 監聽窗口大小變化
    useEffect(() => {
        const handleResize = () => checkScrollPosition();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        scrollRef,
        showLeftArrow,
        showRightArrow,
        scrollLeft,
        scrollRight,
        checkScrollPosition,
    };
};
