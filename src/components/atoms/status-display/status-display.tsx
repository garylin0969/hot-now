/**
 * @fileoverview 狀態顯示元件
 */
import { cn } from '@/utils/shadcn';

/** 狀態顯示元件屬性介面 */
interface StatusDisplayProps {
    /** 是否正在載入 */
    isLoading?: boolean;
    /** 錯誤物件 */
    error?: Error | null;
    /** 自定義一般訊息 */
    message?: string;
    /** 自定義載入訊息 */
    loadingMessage?: string;
    /** 自定義錯誤訊息 (若未提供則使用 error.message) */
    errorMessage?: string;
    /** 自定義樣式類名 */
    className?: string;
}

/**
 * 通用的狀態回饋元件
 * 根據傳入的狀態 (Loading, Error, Message) 顯示對應的提示訊息。
 *
 * @param props - 元件屬性
 * @returns 渲染後的狀態訊息，若無狀態則返回 null
 */
const StatusDisplay = ({
    isLoading = false,
    error = null,
    message,
    loadingMessage = 'Loading...',
    errorMessage,
    className = '',
}: StatusDisplayProps) => {
    // Loading狀態
    if (isLoading) {
        return (
            <div className={cn('flex items-center justify-center py-8', className)}>
                <div className="text-muted-foreground">{loadingMessage}</div>
            </div>
        );
    }

    // Error狀態
    if (error) {
        const displayMessage = errorMessage || `Error: ${error.message}`;
        return (
            <div className={cn('flex items-center justify-center py-8', className)}>
                <div className="text-destructive">{displayMessage}</div>
            </div>
        );
    }

    // 客製化訊息
    if (message) {
        return (
            <div className={cn('flex items-center justify-center py-8', className)}>
                <div className="text-muted-foreground">{message}</div>
            </div>
        );
    }

    // 如果沒有任何狀態，返回null
    return null;
};

export default StatusDisplay;
