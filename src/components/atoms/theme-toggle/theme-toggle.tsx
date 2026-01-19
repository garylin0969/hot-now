'use client';

/**
 * @fileoverview 主題切換按鈕元件
 */
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMounted } from '@/hooks/use-is-mounted';

/**
 * 日夜間模式切換按鈕
 * 使用 next-themes 進行主題管理，並處理 Hydration 問題。
 *
 * @returns 渲染後的切換按鈕
 */
const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const isMounted = useIsMounted();

    if (!isMounted) {
        return (
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Skeleton className="h-4 w-4 rounded-full" />
                <span className="sr-only">切換主題</span>
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            {resolvedTheme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            <span className="sr-only">切換主題</span>
        </Button>
    );
};

export default ThemeToggle;
