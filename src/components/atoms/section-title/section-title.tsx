/**
 * @fileoverview 章節標題元件
 */
import { ReactNode } from 'react';
import { cn } from '@/utils/shadcn';

/** 章節標題屬性介面 */
interface SectionTitleProps {
    /** 自定義樣式類名 */
    className?: string;
    /** 標題文字 */
    title?: string;
    /** 子元素 (例如圖標或額外標籤) */
    children?: ReactNode;
}

/**
 * 用於區塊開頭的章節標題元件
 *
 * @param props - 元件屬性
 * @returns 渲染後的標題區塊
 */
const SectionTitle = ({ className, title, children }: SectionTitleProps) => {
    return (
        <div className={cn('mb-4 flex items-center justify-center', className)}>
            <h2 className="text-primary bg-primary/10 rounded-2xl px-4 py-2 font-extrabold">
                {title}
                {children}
            </h2>
        </div>
    );
};

export default SectionTitle;
