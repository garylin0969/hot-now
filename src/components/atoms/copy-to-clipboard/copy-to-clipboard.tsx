'use client';

import { Check, Copy } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/shadcn';

interface CopyToClipboardProps {
    text?: string;
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    children?: ReactNode;
}

const CopyToClipboard = ({
    text = '',
    className,
    variant = 'outline',
    size = 'sm',
    children,
}: CopyToClipboardProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Button
            onClick={handleCopy}
            variant={variant}
            size={size}
            className={cn('transition-all duration-200', className)}
        >
            {isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {children}
        </Button>
    );
};

export default CopyToClipboard;
