'use client';

import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/shadcn';

interface CopyToClipboardProps {
    text?: string;
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    showToast?: boolean;
    children?: ReactNode;
}

const CopyToClipboard = ({
    text = '',
    className,
    variant = 'outline',
    size = 'sm',
    showToast = true,
    children,
}: CopyToClipboardProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            if (showToast) {
                toast.success('Copied');
            }

            // 清除之前的 timer（如果存在）
            clearTimer();

            // 2秒後重置狀態
            timerRef.current = setTimeout(() => {
                setIsCopied(false);
                timerRef.current = null;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            if (showToast) {
                toast.error('Failed to copy');
            }
        }
    };

    // 組件卸載時清理 timer
    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

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
