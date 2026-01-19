'use client';

/**
 * @fileoverview 快捷方式編輯對話框
 * 提供使用者新增或編輯快捷方式的介面。
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DIALOG_MESSAGES, SHORTCUTS_CONFIG } from '@/constants/shortcuts';
import { useShortcutsStore } from '@/store/shortcuts';
import {
    shortcutsFormSchema,
    getInitialFormData,
    validateAndProcessFormData,
    type ShortcutsFormData,
} from '@/utils/shortcuts';

interface ShortcutsDialogProps {
    /** 觸發對話框的子元件 (選填) */
    children?: React.ReactNode;
}

/**
 * 快捷方式管理對話框元件
 *
 * @param props - 元件屬性
 * @param props.children - 自定義觸發按鈕元件
 * @returns 對話框元件
 */
const ShortcutsDialog = ({ children }: ShortcutsDialogProps) => {
    const { shortcuts, setShortcuts } = useShortcutsStore();
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<ShortcutsFormData>({
        resolver: zodResolver(shortcutsFormSchema),
        defaultValues: getInitialFormData(shortcuts),
    });

    const { register, handleSubmit, reset } = form;

    // 當 dialog 打開時重置表單
    useEffect(() => {
        if (isOpen) {
            reset(getInitialFormData(shortcuts));
        }
    }, [isOpen, shortcuts, reset]);

    // 提交表單
    const onSubmit = (data: ShortcutsFormData) => {
        const { validShortcuts, invalidUrls } = validateAndProcessFormData(data, shortcuts);

        if (invalidUrls.length > 0) {
            toast.error(`${DIALOG_MESSAGES.INVALID_URL_PREFIX}${invalidUrls.join(', ')}`);
            return;
        }

        setShortcuts(validShortcuts);
        toast.success(DIALOG_MESSAGES.SUCCESS);
        setIsOpen(false);
    };

    // 取消按鈕
    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                        <Plus className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{DIALOG_MESSAGES.TITLE}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid max-h-96 grid-cols-1 gap-4 overflow-y-auto p-2">
                        {Array.from({ length: SHORTCUTS_CONFIG.MAX_SHORTCUTS }, (_, i) => (
                            <div key={i} className="space-y-2">
                                <Input
                                    id={`url-${i}`}
                                    placeholder={DIALOG_MESSAGES.PLACEHOLDER}
                                    autoComplete="off"
                                    {...register(`shortcuts.${i}.url`)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            {DIALOG_MESSAGES.CANCEL}
                        </Button>
                        <Button type="submit">{DIALOG_MESSAGES.SAVE}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ShortcutsDialog;
