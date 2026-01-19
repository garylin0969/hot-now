'use client';

/**
 * @fileoverview 首頁標籤頁客戶端包裝元件
 * 僅包裝 Radix UI Tabs 的控制邏輯，內容由 Server Component 傳入。
 */
import { type ReactNode } from 'react';
import ScrollableTabsWrapper from '@/components/molecules/scrollable-tabs-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HOME_TABS } from '@/constants/home';
import { useIsMounted } from '@/hooks/use-is-mounted';

/** 標籤頁觸發器 (TabTrigger) 的共用樣式類名 */
const TAB_TRIGGER_CLASSNAME =
    'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ' +
    'hover:bg-accent hover:text-accent-foreground ' +
    'flex-shrink-0 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm';

/**
 * 標籤列表的加載佔位元件
 */
const TabsListSkeleton = () => (
    <div className="mb-3 flex w-full justify-center">
        <div className="flex space-x-1">
            {HOME_TABS.map((tab) => (
                <Skeleton key={tab?.value} className="h-8 w-16 rounded-md sm:h-9 sm:w-20" />
            ))}
        </div>
    </div>
);

/**
 * 已掛載時顯示的標籤列表
 */
const MountedTabsList = () => (
    <div className="mb-3 flex w-full justify-center">
        <ScrollableTabsWrapper>
            <TabsList className="text-muted-foreground mx-auto space-x-1 bg-transparent">
                {HOME_TABS.map((tab) => (
                    <TabsTrigger key={tab?.value} className={TAB_TRIGGER_CLASSNAME} value={tab?.value}>
                        {tab?.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </ScrollableTabsWrapper>
    </div>
);

interface HomeTabsProps {
    /** 各標籤頁的內容（已由 Server Component 渲染的 TabsContent） */
    children: ReactNode;
}

/**
 * 首頁標籤頁元件
 * 僅負責客戶端的 Tabs 控制邏輯，實際內容由外部 Server Component 傳入。
 * 始終渲染 Tabs 容器以確保 TabsContent 正確運作。
 *
 * @param props - 元件屬性
 * @param props.children - 包含 TabsContent 的已渲染內容
 * @returns 渲染後的標籤頁介面
 */
const HomeTabs = ({ children }: HomeTabsProps) => {
    const isMounted = useIsMounted();

    return (
        <Tabs defaultValue={HOME_TABS[0]?.value} className="w-full">
            {/* 客戶端掛載前顯示骨架屏，掛載後顯示真實標籤列表 */}
            {isMounted ? <MountedTabsList /> : <TabsListSkeleton />}
            {children}
        </Tabs>
    );
};

export default HomeTabs;
