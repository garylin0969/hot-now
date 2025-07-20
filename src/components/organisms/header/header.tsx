import Link from 'next/link';
import { FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa';
import NextImage from '@/components/atoms/next-image';
import ThemeToggle from '@/components/atoms/theme-toggle';
import NoticeBar from '@/components/molecules/notice-bar';

const LOGO_IMAGE_PATH = '/favicons/favicon-32x32.png';

const SOCIAL_LINKS = [
    {
        href: 'https://www.google.com',
        target: '_blank',
        icon: FaGoogle,
        label: 'Google',
    },
    {
        href: 'https://www.linkedin.com/in/garylin0969',
        target: '_blank',
        icon: FaLinkedin,
        label: 'LinkedIn',
    },
    {
        href: 'https://github.com/garylin0969',
        target: '_blank',
        icon: FaGithub,
        label: 'GitHub',
    },
] as const;

const NOTICE_BAR_MESSAGE = '點我至 Chrome Extension 商店';
const NOTICE_BAR_LINK =
    'https://chromewebstore.google.com/detail/hot-now%EF%BD%9C%E7%86%B1%E9%96%80%E8%A9%B1%E9%A1%8C%E4%B8%80%E6%8A%8A%E6%8A%93/pcgkeopgenagbemoagdogljeapjhapch';

const Header = () => {
    return (
        <header className="border-border/40 bg-background/70 sticky top-0 left-0 z-50 border-b shadow-md backdrop-blur-md">
            <div className="container mx-auto flex h-14.5 items-center justify-between p-2 md:p-0">
                <Link href="/" className="flex items-center gap-x-2">
                    <NextImage src={LOGO_IMAGE_PATH} width={32} height={32} alt="Hot Now logo" loading="eager" />
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
            <NoticeBar message={NOTICE_BAR_MESSAGE} link={NOTICE_BAR_LINK} isWebsiteOnly />
        </header>
    );
};

export default Header;
