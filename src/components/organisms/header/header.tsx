import React from 'react';

import { ThemeToggle } from '@/components/atoms/theme-toggle';

const Header = () => {
    return (
        <header className='border-border/40 bg-background/70 sticky top-0 left-0 z-50 h-14.5 border-b shadow-md backdrop-blur-md'>
            <div className='container mx-auto flex h-full items-center justify-between'>
                <h1 className='text-2xl font-bold'>Hot Now</h1>
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
