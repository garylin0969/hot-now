'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useRef, useState, useEffect } from 'react';
import { cn } from '@/utils/shadcn';

interface ScrollableTabsWrapperProps {
    className?: string;
    children?: ReactNode;
}

const ScrollableTabsWrapper = ({ className, children }: ScrollableTabsWrapperProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // 檢查滾動位置並更新箭頭顯示狀態
    const checkScrollPosition = () => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        // 當滾動位置大於 0 時顯示左箭頭
        setShowLeftArrow(scrollLeft > 0);

        // 當還沒滾動到最右邊時顯示右箭頭
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    };

    // 初始化時檢查一次
    useEffect(() => {
        checkScrollPosition();

        // 監聽窗口大小變化
        const handleResize = () => {
            checkScrollPosition();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [children]);

    // 左滑動
    const scrollLeft = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: -120,
            behavior: 'smooth',
        });
    };

    // 右滑動
    const scrollRight = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: 120,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cn('relative flex w-full items-center px-4 md:w-auto', className)}>
            {/* 左箭頭 */}
            {showLeftArrow && (
                <button
                    onClick={scrollLeft}
                    className="absolute top-1/2 -left-3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center md:hidden"
                    aria-label="向左滑動"
                >
                    <ChevronLeft className="text-foreground text-lg font-bold" />
                </button>
            )}

            <div
                ref={scrollRef}
                className="overflow-x-auto"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
                onScroll={checkScrollPosition}
            >
                {children}
            </div>

            {/* 右箭頭 */}
            {showRightArrow && (
                <button
                    onClick={scrollRight}
                    className="absolute top-1/2 -right-3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center md:hidden"
                    aria-label="向右滑動"
                >
                    <ChevronRight className="text-foreground text-lg font-bold" />
                </button>
            )}
        </div>
    );
};

export default ScrollableTabsWrapper;
