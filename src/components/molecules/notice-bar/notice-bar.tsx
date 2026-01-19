'use client';

/**
 * @fileoverview 公告欄元件
 */
import { FaInfoCircle } from 'react-icons/fa';
import { useSyncExternalStore } from 'react';
import { cn } from '@/utils/shadcn';

/** 連結屬性設定 */
const LINK_PROPS = {
    target: '_blank',
    rel: 'noopener noreferrer',
} as const;

/** 公告欄屬性介面 */
interface NoticeBarProps {
    /** 自定義樣式類名 */
    className?: string;
    /** 公告訊息內容 */
    message: string;
    /** 公告連結 (選填) */
    link?: string;
}

const subscribe = () => () => {};
const getSnapshot = () => window.self === window.top;
const getServerSnapshot = () => false;

/**
 * 頂部公告欄元件
 * 用於顯示重要通知，可設定連結與顯示條件 (僅網站/Iframe)。
 *
 * @param props - 元件屬性
 * @returns 渲染後的公告欄，若無訊息或不符合顯示條件則返回 null
 */
const NoticeBar = ({ className, message, link }: NoticeBarProps) => {
    const isWebsite = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    // 只有在網站上才會顯示，否則在網站上和 iframe 中都會顯示
    if (!isWebsite) return null;

    if (!message) return null;

    const Component = link ? 'a' : 'span';

    return (
        <div className={cn('bg-primary/10 text-primary py-1', className)}>
            <div className="flex items-center justify-center gap-x-2">
                <FaInfoCircle />
                <Component href={link} {...(link && LINK_PROPS)}>
                    {message}
                </Component>
            </div>
        </div>
    );
};

export default NoticeBar;
