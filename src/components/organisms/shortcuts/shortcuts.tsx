'use client';

import { useState } from 'react';
import NativeImage from '@/components/atoms/native-image';
import { useShortcutsStore } from '@/store/shortcuts';
import { cn } from '@/utils/shadcn';
import ShortcutsDialog from './shortcuts-dialog';

interface ShortcutsProps {
    className?: string;
}

// 從 URL 獲取 favicon
const getFaviconUrl = (url: string) => {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
        return '/favicon.ico';
    }
};

const Shortcuts = ({ className }: ShortcutsProps) => {
    const { shortcuts } = useShortcutsStore();
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (shortcutId: string) => {
        setImageErrors((prev) => ({ ...prev, [shortcutId]: true }));
    };

    const handleLinkClick = (url: string) => {
        // 確保 URL 有協議
        const finalUrl = url.startsWith('http') ? url : `https://${url}`;
        window.open(finalUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={cn('flex flex-wrap gap-4', className)}>
            {shortcuts.map((shortcut) => (
                <div
                    key={shortcut.id}
                    className="group flex cursor-pointer flex-col items-center gap-2"
                    onClick={() => handleLinkClick(shortcut.url)}
                >
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 transition-colors">
                        {imageErrors[shortcut.id] ? (
                            <div className="flex h-full w-full items-center justify-center">
                                <span className="text-xs font-medium">{shortcut.title.charAt(0).toUpperCase()}</span>
                            </div>
                        ) : (
                            <NativeImage
                                src={getFaviconUrl(shortcut.url)}
                                alt={shortcut.title}
                                className="h-full w-full object-cover"
                                onError={() => handleImageError(shortcut.id)}
                            />
                        )}
                    </div>
                    <span className="max-w-16 truncate text-center text-xs transition-colors">{shortcut.title}</span>
                </div>
            ))}

            {shortcuts.length < 8 && (
                <ShortcutsDialog>
                    <div className="group flex cursor-pointer flex-col items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed transition-colors">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <span className="max-w-16 text-center text-xs">Add</span>
                    </div>
                </ShortcutsDialog>
            )}
        </div>
    );
};

export default Shortcuts;
