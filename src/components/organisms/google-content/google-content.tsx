/**
 * @fileoverview Google Trends 內容區塊元件
 */
import type { ComponentProps } from 'react';
import SectionTitle from '@/components/atoms/section-title';
import GoogleTrendCard from '@/components/molecules/google-trend-card';
import type { HomePageData } from '@/types';
import { cn } from '@/utils/shadcn';

/** Google Trends 內容區塊元件屬性。 */
interface GoogleContentProps extends ComponentProps<'div'> {
    /** 首頁聚合後的 Google 熱搜列表。 */
    trends: HomePageData['google'];
}

/**
 * Google 搜尋趨勢內容區塊
 * 展示型元件，負責顯示 Google 即時搜尋趨勢。
 *
 * @param props - 元件屬性
 * @param props.trends - Google 熱搜資料
 * @returns 渲染後的 Google 趨勢列表
 */
const GoogleContent = ({ className, trends, ...props }: GoogleContentProps) => {
    return (
        <div className={cn('w-full', className)} {...props}>
            <SectionTitle title="過去4小時" />
            <div className="mx-auto flex max-w-xl flex-col gap-4">
                {trends?.map((trend) => (
                    <GoogleTrendCard key={trend.googleTrend} trend={trend} />
                ))}
            </div>
        </div>
    );
};

export default GoogleContent;
