/**
 * @fileoverview 頁首元件
 */
import Link from 'next/link';
import BaseImage from '@/components/atoms/base-image';
import ThemeToggle from '@/components/atoms/theme-toggle';
import NoticeBar from '@/components/molecules/notice-bar';
import { LOGO_IMAGE_PATH, NOTICE_BAR_CONFIG, SOCIAL_LINKS } from '@/constants/site';

/**
 * 網站頁首
 * 包含 Logo、導航連結、社交圖標、主題切換與頂部公告欄。
 * 具有 sticky 定位與毛玻璃效果。
 *
 * @returns 渲染後的頁首區塊
 */
const Header = () => {
    return (
        <header className="border-border/40 bg-background/70 sticky top-0 left-0 z-50 border-b shadow-md backdrop-blur-md">
            <div className="container mx-auto flex h-14.5 items-center justify-between p-2 md:p-0">
                <Link href="/" className="flex items-center gap-x-2">
                    <BaseImage src={LOGO_IMAGE_PATH} width={32} height={32} alt="Hot Now logo" loading="eager" />
                    <div className="text-primary text-2xl font-extrabold">Hot Now</div>
                </Link>
                <nav className="flex items-center gap-2">
                    {SOCIAL_LINKS.map(({ href, target, icon: Icon, label }) => (
                        <a key={label} href={href} target={target} rel="noopener noreferrer">
                            <Icon className="h-4 w-4" />
                            <span className="sr-only">{label}</span>
                        </a>
                    ))}
                    <ThemeToggle />
                </nav>
            </div>
            <NoticeBar message={NOTICE_BAR_CONFIG.MESSAGE} link={NOTICE_BAR_CONFIG.LINK} />
        </header>
    );
};

export default Header;
