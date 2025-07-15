'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useRef } from 'react';
import { cn } from '@/utils/shadcn';

interface ScrollableTabsWrapperProps {
    className?: string;
    children?: ReactNode;
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

    return (
        <div className={cn('relative flex w-full items-center px-4 md:w-auto', className)}>
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
                className="overflow-x-auto"
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
