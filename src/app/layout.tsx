import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';
import IframePotMessage from '@/components/atoms/iframe-pot-message';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import { Toaster } from '@/components/ui/sonner';
import { QueryProvider, ThemeProvider } from '@/providers';
import { cn } from '@/utils/shadcn';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        default: 'Hot Now｜熱門話題一把抓',
        template: '%s | Hot Now',
    },
    description:
        '用 Hot Now 隨時掌握熱門話題，包含 PTT、Reddit、YouTube、BBC、巴哈姆特、Komica、Google 趨勢等平台的熱門內容。',
    keywords: [
        'PTT',
        'Reddit',
        'YouTube',
        'Bahamut',
        'Komica',
        'Google Trends',
        'BBC',
        '熱門',
        '趨勢',
        '整合',
        '台灣',
        '討論區',
    ],
    authors: [{ name: 'Hot Now' }],
    creator: 'Hot Now',
    publisher: 'Hot Now',
    metadataBase: new URL('https://hotnow.garylin.dev'),
    alternates: {
        canonical: '/',
        languages: {
            'zh-TW': '/',
            'zh-CN': '/',
            en: '/',
        },
    },
    openGraph: {
        title: 'Hot Now｜熱門話題一把抓',
        description:
            '用 Hot Now 隨時掌握熱門話題，包含 PTT、Reddit、YouTube、BBC、巴哈姆特、Komica、Google 趨勢等平台的熱門內容。',
        url: 'https://hotnow.garylin.dev',
        siteName: 'Hot Now',
        locale: 'zh_TW',
        type: 'website',
        images: [
            {
                url: '/favicons/android-chrome-512x512.png',
                width: 512,
                height: 512,
                alt: 'Hot Now｜熱門話題一把抓',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hot Now｜熱門話題一把抓',
        description:
            '用 Hot Now 隨時掌握熱門話題，包含 PTT、Reddit、YouTube、BBC、巴哈姆特、Komica、Google 趨勢等平台的熱門內容。',
        images: ['/favicons/android-chrome-512x512.png'],
        creator: '@hotnow',
        site: '@hotnow',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        other: [
            {
                rel: 'icon',
                url: '/favicons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                rel: 'icon',
                url: '/favicons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    },
    manifest: '/favicons/site.webmanifest',
    category: 'technology',
    classification: 'Hot Content Aggregator',
    referrer: 'origin-when-cross-origin',
    generator: 'Next.js',
    applicationName: 'Hot Now',
    appleWebApp: {
        title: 'Hot Now',
        statusBarStyle: 'default',
        capable: true,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
    colorScheme: 'light dark',
};

const GA_ID = 'G-F0MRGZ2J39';

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="zh-TW" suppressHydrationWarning>
            <body className={cn('flex min-h-screen flex-col antialiased', geistSans.variable, geistMono.variable)}>
                <QueryProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <Toaster />
                    </ThemeProvider>
                </QueryProvider>
                <GoogleAnalytics gaId={GA_ID} />
                <IframePotMessage />
            </body>
        </html>
    );
}
