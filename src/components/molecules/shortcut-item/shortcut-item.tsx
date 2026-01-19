/**
 * @fileoverview 單個快捷方式項目元件
 */
import { KeyboardEvent } from 'react';
import BaseImage from '@/components/atoms/base-image';
import type { Shortcut } from '@/types/shortcuts';
import { getFaviconUrl, openUrlInNewTab } from '@/utils/shortcuts';

/** 快捷方式項目屬性介面 */
interface ShortcutItemProps {
    /** 快捷方式資料 */
    shortcut: Shortcut;
}

/** 內部元件：顯示快捷方式圖標 */
const ShortcutIcon = ({ url, title }: { url: string; title: string }) => {
    return <BaseImage src={getFaviconUrl(url)} alt={`${title} icon`} className="h-full w-full object-cover" fill />;
};

/**
 * 顯示單個網站快捷方式的元件
 * 包含點擊與鍵盤互動邏輯
 *
 * @param props - 元件屬性
 * @param props.shortcut - 快捷方式資料物件
 * @returns 渲染後的快捷方式項目
 */
const ShortcutItem = ({ shortcut }: ShortcutItemProps) => {
    const handleLinkClick = (url: string) => {
        openUrlInNewTab(url);
    };

    const handleKeyDown = (event: KeyboardEvent, url: string) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleLinkClick(url);
        }
    };

    return (
        <div
            className="group flex cursor-pointer flex-col items-center gap-2"
            onClick={() => handleLinkClick(shortcut.url)}
            onKeyDown={(e) => handleKeyDown(e, shortcut.url)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${shortcut.title}`}
        >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 transition-colors">
                <ShortcutIcon url={shortcut.url} title={shortcut.title} />
            </div>
            <span className="max-w-16 truncate text-center text-xs transition-colors">{shortcut.title}</span>
        </div>
    );
};

export default ShortcutItem;
