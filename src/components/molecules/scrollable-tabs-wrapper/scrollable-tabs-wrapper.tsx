'use client';

/**
 * @fileoverview 可滾動的標籤頁容器元件
 */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { useScrollable } from '@/hooks/use-scrollable';
import { cn } from '@/utils/shadcn';

/** 屬性介面 */
interface ScrollableTabsWrapperProps {
    /** 自定義樣式類名 */
    className?: string;
    /** 子元素 (通常是 TabsList) */
    children?: ReactNode;
}

/**
 * 封裝的可滾動標籤頁容器
 * 當標籤頁超出容器寬度時，提供左右滾動箭頭以便於操作。
 * 自動偵測滾動位置與視窗大小變化。
 *
 * @param props - 元件屬性
 * @returns 渲染後的滾動容器
 */
const ScrollableTabsWrapper = ({ className, children }: ScrollableTabsWrapperProps) => {
    const { scrollRef, showLeftArrow, showRightArrow, scrollLeft, scrollRight, checkScrollPosition } = useScrollable();

    // 當子元素變動時重新檢查滾動位置
    useEffect(() => {
        checkScrollPosition();
    }, [children, checkScrollPosition]);

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
