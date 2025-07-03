'use client';

import { useState } from 'react';
import NativeImage from '@/components/atoms/native-image';
import { useShortcutsStore } from '@/store/shortcuts';
import { cn } from '@/utils/shadcn';
import { SHORTCUTS_CONFIG, getFaviconUrl, getShortcutInitial, openUrlInNewTab } from '@/utils/shortcuts';
import ShortcutsDialog from './shortcuts-dialog';

interface ShortcutsProps {
    className?: string;
}

// 快捷方式圖標
const ShortcutIcon = ({
    shortcut,
    hasError,
    onError,
}: {
    shortcut: { id: string; url: string; title: string };
    hasError: boolean;
    onError: () => void;
}) => {
    if (hasError) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <span className="text-xs font-medium">{getShortcutInitial(shortcut.title)}</span>
            </div>
        );
    }

    return (
        <NativeImage
            src={getFaviconUrl(shortcut.url)}
            alt={shortcut.title}
            className="h-full w-full object-cover"
            onError={onError}
        />
    );
};

// 添加快捷方式按鈕
const AddShortcutButton = () => (
    <ShortcutsDialog>
        <div className="group flex cursor-pointer flex-col items-center gap-2">
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
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (shortcutId: string) => {
        setImageErrors((prev) => ({ ...prev, [shortcutId]: true }));
    };

    const handleLinkClick = (url: string) => {
        openUrlInNewTab(url);
    };

    const showAddButton = shortcuts.length < SHORTCUTS_CONFIG.MAX_SHORTCUTS;

    return (
        <div className={cn('flex flex-wrap gap-4', className)}>
            {shortcuts.map((shortcut) => (
                <div
                    key={shortcut.id}
                    className="group flex cursor-pointer flex-col items-center gap-2"
                    onClick={() => handleLinkClick(shortcut.url)}
                >
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 transition-colors">
                        <ShortcutIcon
                            shortcut={shortcut}
                            hasError={imageErrors[shortcut.id] || false}
                            onError={() => handleImageError(shortcut.id)}
                        />
                    </div>
                    <span className="max-w-16 truncate text-center text-xs transition-colors">{shortcut.title}</span>
                </div>
            ))}

            {showAddButton && <AddShortcutButton />}
        </div>
    );
};

export default Shortcuts;
