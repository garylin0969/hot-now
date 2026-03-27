'use client';

import { KeyboardEvent } from 'react';
import NextImage from '@/components/atoms/next-image';
import { useShortcutsStore } from '@/store/shortcuts';
import { cn } from '@/utils/shadcn';
import { getFaviconUrl, openUrlInNewTab } from '@/utils/shortcuts';
import ShortcutsDialog from './shortcuts-dialog';

interface ShortcutsProps {
    className?: string;
}

// 快捷方式圖標
const ShortcutIcon = ({ shortcut }: { shortcut: { id: string; url: string; title: string } }) => {
    return (
        <NextImage
            src={getFaviconUrl(shortcut.url)}
            alt={`${shortcut.title} icon`}
            className="h-full w-full object-cover"
            fill
        />
    );
};

// 添加快捷方式按鈕
const AddShortcutButton = () => (
    <ShortcutsDialog>
        <div
            className="group flex cursor-pointer flex-col items-center gap-2"
            role="button"
            tabIndex={0}
            aria-label="Add new shortcut"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed transition-colors">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
            <span className="max-w-16 text-center text-xs">Add</span>
        </div>
    </ShortcutsDialog>
);

// 快捷方式組件
const Shortcuts = ({ className }: ShortcutsProps) => {
    const { shortcuts } = useShortcutsStore();

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
        <div className={cn('flex flex-wrap items-center justify-center gap-4', className)}>
            {shortcuts.map((shortcut) => (
                <div
                    key={shortcut.id}
                    className="group flex cursor-pointer flex-col items-center gap-2"
                    onClick={() => handleLinkClick(shortcut.url)}
                    onKeyDown={(e) => handleKeyDown(e, shortcut.url)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${shortcut.title}`}
                >
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 transition-colors">
                        <ShortcutIcon shortcut={shortcut} />
                    </div>
                    <span className="max-w-16 truncate text-center text-xs transition-colors">{shortcut.title}</span>
                </div>
            ))}

            <AddShortcutButton />
        </div>
    );
};

export default Shortcuts;
