import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Header } from '@/components/organisms/header';
import { cn } from '@/lib/utils';

import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Hot Now',
    description: 'Hot Now'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='zh-TW'>
            <body className={cn('antialiased', geistSans.variable, geistMono.variable)}>
                <Header />
                {children}
            </body>
        </html>
    );
}
