'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useShortcutsStore, type Shortcut } from '@/store/shortcuts';
import { SHORTCUTS_CONFIG, isValidUrl, extractTitleFromUrl, normalizeUrl, generateShortcutId } from '@/utils/shortcuts';

interface ShortcutsDialogProps {
    children?: React.ReactNode;
}

// 常量
const DIALOG_MESSAGES = {
    TITLE: 'Shortcuts',
    PLACEHOLDER: 'Add shortcuts',
    CANCEL: 'Cancel',
    SAVE: 'Save',
    SUCCESS: 'Shortcuts saved',
    INVALID_URL_PREFIX: 'Invalid URL: ',
    INVALID_URL_TEMPLATE: 'URL {index}',
} as const;

// 驗證 schema
const urlSchema = z.string().refine(
    (url) => {
        if (!url.trim()) return true; // 空字串是有效的
        return isValidUrl(url);
    },
    { message: 'Please enter a valid URL' }
);

// 表單驗證 schema
const shortcutsFormSchema = z.object({
    shortcuts: z.array(
        z.object({
            url: urlSchema,
        })
    ),
});

type ShortcutsFormData = z.infer<typeof shortcutsFormSchema>;

// 創建快捷方式
const createShortcutFromUrl = (url: string, index: number, existingShortcut?: Shortcut): Shortcut => {
    const urlWithProtocol = normalizeUrl(url);
    return {
        id: existingShortcut?.id || generateShortcutId(index),
        url: urlWithProtocol,
        title: extractTitleFromUrl(url),
    };
};

// 獲取初始表單數據
const getInitialFormData = (shortcuts: Shortcut[]): ShortcutsFormData => {
    return {
        shortcuts: Array.from({ length: SHORTCUTS_CONFIG.MAX_SHORTCUTS }, (_, i) => ({
            url: shortcuts[i]?.url || '',
        })),
    };
};

// 驗證並處理表單數據
const validateAndProcessFormData = (
    data: ShortcutsFormData,
    existingShortcuts: Shortcut[]
): { validShortcuts: Shortcut[]; invalidUrls: string[] } => {
    const validShortcuts: Shortcut[] = [];
    const invalidUrls: string[] = [];

    data.shortcuts.forEach((shortcut, index) => {
        const url = shortcut.url.trim();
        if (url !== '') {
            if (isValidUrl(url)) {
                const existingShortcut = existingShortcuts[index];
                validShortcuts.push(createShortcutFromUrl(url, index, existingShortcut));
            } else {
                invalidUrls.push(DIALOG_MESSAGES.INVALID_URL_TEMPLATE.replace('{index}', (index + 1).toString()));
            }
        }
    });

    return { validShortcuts, invalidUrls };
};

// 快捷方式對話框
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
