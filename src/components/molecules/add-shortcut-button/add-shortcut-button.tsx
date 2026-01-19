/**
 * @fileoverview 添加快捷方式按鈕元件
 */
import { ComponentProps } from 'react';
import { cn } from '@/utils/shadcn';

/**
 * 顯示「添加快捷方式」的按鈕元件
 * 純展示元件，點擊行為由父元件或外層 DialogTrigger 控制
 *
 * @param props - 原生 div 屬性
 * @param props.className - 自定義樣式類名
 * @param props.ref - React ref
 * @returns 渲染後的按鈕
 */
const AddShortcutButton = ({ className, ref, ...props }: ComponentProps<'div'>) => (
    <div
        ref={ref}
        className={cn('group flex cursor-pointer flex-col items-center gap-2', className)}
        role="button"
        tabIndex={0}
        aria-label="Add new shortcut"
        {...props}
    >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </div>
        <span className="max-w-16 text-center text-xs">Add</span>
    </div>
);

export default AddShortcutButton;
