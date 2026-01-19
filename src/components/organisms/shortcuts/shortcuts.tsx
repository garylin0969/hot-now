'use client';

/**
 * @fileoverview 快捷方式列表容器元件
 */
import AddShortcutButton from '@/components/molecules/add-shortcut-button';
import ShortcutItem from '@/components/molecules/shortcut-item';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useShortcutsStore } from '@/store/shortcuts';
import { cn } from '@/utils/shadcn';
import ShortcutsDialog from './shortcuts-dialog';

interface ShortcutsProps {
    /** 自定義樣式類名 */
    className?: string;
}

/**
 * 顯示使用者自定義快捷方式列表的容器元件
 * 包含現有的快捷方式與新增按鈕
 *
 * @param props - 元件屬性
 * @param props.className - 自定義樣式類名
 * @returns 渲染後的快捷方式區域
 */
const Shortcuts = ({ className }: ShortcutsProps) => {
    const { shortcuts } = useShortcutsStore();
    const isMounted = useIsMounted();

    return (
        <div className={cn('flex flex-wrap items-center justify-center gap-4', className)}>
            {shortcuts.map((shortcut) => (
                <ShortcutItem key={shortcut.id} shortcut={shortcut} />
            ))}

            {/* 僅在客戶端掛載後渲染 Dialog，避免 Radix UI hydration mismatch */}
            {isMounted ? (
                <ShortcutsDialog>
                    <AddShortcutButton />
                </ShortcutsDialog>
            ) : (
                <AddShortcutButton />
            )}
        </div>
    );
};

export default Shortcuts;
