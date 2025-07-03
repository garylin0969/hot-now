import Link from 'next/link';
import { FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa';
import NativeImage from '@/components/atoms/native-image';
import ThemeToggle from '@/components/atoms/theme-toggle';

const SOCIAL_LINKS = [
    {
        href: 'https://www.google.com',
        target: '_self',
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

const Header = () => {
    return (
        <header className="border-border/40 bg-background/70 sticky top-0 left-0 z-50 h-14.5 border-b shadow-md backdrop-blur-md">
            <div className="container mx-auto flex h-full items-center justify-between p-2 md:p-0">
                <Link href="/" className="flex items-center gap-x-2">
                    <NativeImage src="/favicon/favicon-32x32.png" alt="Hot Now" className="h-8 w-8" />
                    <h1 className="text-primary text-2xl font-extrabold">Hot Now</h1>
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
        </header>
    );
};

export default Header;
