import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';
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
        default: 'Hot Now - 熱門內容整合平台',
        template: '%s | Hot Now',
    },
    description: '追蹤 PTT、Reddit、YouTube、巴哈姆特、Komica、Google 趨勢等平台的熱門內容，瀏覽最新話題與趨勢。',
    keywords: [
        'PTT',
        'Reddit',
        'YouTube',
        'Bahamut',
        'Komica',
        'Google Trends',
        '熱門',
        '趨勢',
        '整合',
        '台灣',
        '討論區',
    ],
    authors: [{ name: 'Hot Now' }],
    creator: 'Hot Now',
    publisher: 'Hot Now',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://hot-now.vercel.app'),
    alternates: {
        canonical: '/',
        languages: {
            'zh-TW': '/',
            'zh-CN': '/',
            en: '/',
        },
    },
    openGraph: {
        title: 'Hot Now - 熱門內容整合平台',
        description: '追蹤 PTT、Reddit、YouTube、巴哈姆特、Komica、Google 趨勢等平台的熱門內容，瀏覽最新話題與趨勢。',
        url: 'https://hot-now.vercel.app',
        siteName: 'Hot Now',
        locale: 'zh_TW',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Hot Now - 熱門內容整合平台',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hot Now - 熱門內容整合平台',
        description: '追蹤 PTT、Reddit、YouTube、巴哈姆特、Komica、Google 趨勢等平台的熱門內容',
        images: ['/og-image.png'],
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
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        other: [
            {
                rel: 'icon',
                url: '/favicon/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                rel: 'icon',
                url: '/favicon/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    },
    manifest: '/favicon/site.webmanifest',
    other: {
        'msapplication-TileColor': '#ffffff',
        'msapplication-config': '/favicon/browserconfig.xml',
    },
    verification: {
        google: 'your-google-site-verification-code',
        yandex: 'your-yandex-verification-code',
        yahoo: 'your-yahoo-verification-code',
    },
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
    maximumScale: 1,
    userScalable: false,
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
            <body className={cn('antialiased', geistSans.variable, geistMono.variable)}>
                <QueryProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Header />
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </QueryProvider>
                <GoogleAnalytics gaId={GA_ID} />
            </body>
        </html>
    );
}
