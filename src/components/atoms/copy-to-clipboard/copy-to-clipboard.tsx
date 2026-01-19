'use client';

/**
 * @fileoverview 複製到剪貼簿元件
 */
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/shadcn';

/** 複製元件屬性介面 */
interface CopyToClipboardProps {
    /** 要複製的文字內容 */
    text?: string;
    /** 自定義樣式類名 */
    className?: string;
    /** 按鈕變體樣式 */
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    /** 按鈕尺寸 */
    size?: 'default' | 'sm' | 'lg' | 'icon';
    /** 是否顯示 Toast 提示 */
    showToast?: boolean;
    /** 按鈕內的子元素 (選填) */
    children?: ReactNode;
}

/**
 * 複製到剪貼簿按鈕元件
 * 點擊後將指定文字複製到剪貼簿，並顯示成功提示與切換圖標狀態。
 *
 * @param props - 元件屬性
 * @returns 渲染後的按鈕元件
 */
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

    // 元件卸載時清理 timer
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
