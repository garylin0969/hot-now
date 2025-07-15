'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useRef, useEffect } from 'react';
import { cn } from '@/utils/shadcn';

interface ScrollableTabsWrapperProps {
    className?: string;
    children: ReactNode;
}

const ScrollableTabsWrapper = ({ className, children }: ScrollableTabsWrapperProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

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

    // 監聽滾動事件和設置滾動條隱藏
    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        // 動態添加 CSS 規則來隱藏滾動條
        const styleId = 'scrollable-tabs-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .scrollable-tabs-container::-webkit-scrollbar {
                    display: none;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    return (
        <div className={cn('relative flex w-full items-center px-5 md:w-auto', className)}>
            {/* 左箭頭 */}
            <button
                onClick={scrollLeft}
                className="absolute top-1/2 -left-3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center md:hidden"
                aria-label="向左滑動"
            >
                <ChevronLeft className="text-foreground text-lg font-bold" />
            </button>

            <div
                ref={scrollRef}
                className="scrollable-tabs-container overflow-x-auto"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {children}
            </div>

            {/* 右箭頭 */}
            <button
                onClick={scrollRight}
                className="absolute top-1/2 -right-3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center md:hidden"
                aria-label="向右滑動"
            >
                <ChevronRight className="text-foreground text-lg font-bold" />
            </button>
        </div>
    );
};

export default ScrollableTabsWrapper;
