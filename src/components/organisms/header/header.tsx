import { FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa';
import React from 'react';
import ThemeToggle from '@/components/atoms/theme-toggle';

const Header = () => {
    return (
        <header className="border-border/40 bg-background/70 sticky top-0 left-0 z-50 h-14.5 border-b shadow-md backdrop-blur-md">
            <div className="container mx-auto flex h-full items-center justify-between">
                <h1 className="text-2xl font-bold">Hot Now</h1>
                <nav className="flex items-center gap-2">
                    <a href="https://www.google.com" target="_self" rel="noopener noreferrer">
                        <FaGoogle className="h-4 w-4" />
                        <span className="sr-only">Google</span>
                    </a>
                    <a href="https://www.linkedin.com/in/garylin0969" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="https://github.com/garylin0969" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
};

export default Header;
