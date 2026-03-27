'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // 避免水合錯誤
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
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
