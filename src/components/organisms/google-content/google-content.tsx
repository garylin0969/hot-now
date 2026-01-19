/**
 * @fileoverview Google Trends 內容區塊元件
 */
import { cacheLife } from 'next/cache';
import type { ComponentProps } from 'react';
import SectionTitle from '@/components/atoms/section-title';
import GoogleTrendCard from '@/components/molecules/google-trend-card';
import { GetGoogleTrends } from '@/services/google-api';
import { cn } from '@/utils/shadcn';

/**
 * Google 搜尋趨勢內容區塊
 * 非同步 Server Component，負責獲取並顯示 Google 即時搜尋趨勢。
 *
 * @param props - 元件屬性
 * @returns 渲染後的 Google 趨勢列表
 */
const GoogleContent = async ({ className, ...props }: ComponentProps<'div'>) => {
    'use cache';
    cacheLife('halfHour');

    // 獲取 Google 資料
    const googleResponse = await GetGoogleTrends();
    const googleTrends = googleResponse.trends || [];
    return (
        <div className={cn('w-full', className)} {...props}>
            <SectionTitle title="過去4小時" />
            <div className="mx-auto flex max-w-xl flex-col gap-4">
                {googleTrends?.map((trend) => (
                    <GoogleTrendCard key={trend.googleTrend} trend={trend} />
                ))}
            </div>
        </div>
    );
};

export default GoogleContent;
