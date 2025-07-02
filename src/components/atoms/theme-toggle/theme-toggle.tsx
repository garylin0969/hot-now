'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // 避免水合錯誤
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <div className="h-4 w-4" />
                <span className="sr-only">切換主題</span>
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? (
                <Moon className="h-4 w-4 transition-all" />
            ) : (
                <Sun className="h-4 w-4 transition-all" />
            )}
            <span className="sr-only">切換主題</span>
        </Button>
    );
};

export default ThemeToggle;
