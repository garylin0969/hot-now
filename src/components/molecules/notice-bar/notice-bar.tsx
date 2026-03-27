'use client';

import { FaInfoCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/shadcn';

const LINK_PROPS = {
    target: '_blank',
    rel: 'noopener noreferrer',
} as const;

interface NoticeBarProps {
    className?: string;
    message: string;
    link?: string;
    isWebsiteOnly?: boolean;
}

// 公告元件
const NoticeBar = ({ className, message, link, isWebsiteOnly }: NoticeBarProps) => {
    const [isWebsite, setIsWebsite] = useState(false);

    useEffect(() => {
        if (window.self === window.top) {
            // 如果是在網站上，則設為 true
            setIsWebsite(true);
        }
    }, []);

    // 如果 isWebsiteOnly 為 true，則只有在網站上才會顯示，否則在網站上和 iframe 中都會顯示
    if (isWebsiteOnly && !isWebsite) return null;

    if (!message) return null;

    const Component = link ? 'a' : 'span';

    return (
        <div className={cn('bg-primary/10 text-primary py-1', className)}>
            <div className="flex items-center justify-center gap-x-2">
                <FaInfoCircle />
                <Component href={link} {...(link && LINK_PROPS)}>
                    {message}
                </Component>
            </div>
        </div>
    );
};

export default NoticeBar;
