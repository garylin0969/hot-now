import { cn } from '@/utils/shadcn';

interface StatusDisplayProps {
    isLoading?: boolean;
    error?: Error | null;
    message?: string;
    loadingMessage?: string;
    errorMessage?: string;
    className?: string;
}

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
