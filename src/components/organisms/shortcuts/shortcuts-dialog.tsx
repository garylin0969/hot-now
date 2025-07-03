'use client';

import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useShortcutsStore, type Shortcut } from '@/store/shortcuts';

interface ShortcutsDialogProps {
    children?: React.ReactNode;
}

interface FormData {
    shortcuts: Array<{
        url: string;
    }>;
}

// URL 驗證函數
const isValidUrl = (url: string): boolean => {
    try {
        // 如果沒有協議，加上 https://
        const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
        new URL(urlWithProtocol);
        return true;
    } catch {
        return false;
    }
};

// 從 URL 提取標題
const extractTitleFromUrl = (url: string): string => {
    try {
        const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
        const domain = new URL(urlWithProtocol).hostname;
        // 移除 www. 前綴
        return domain.replace(/^www\./, '');
    } catch {
        return url;
    }
};

const ShortcutsDialog = ({ children }: ShortcutsDialogProps) => {
    const { shortcuts, setShortcuts } = useShortcutsStore();
    const [isOpen, setIsOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            shortcuts: Array.from({ length: 8 }, (_, i) => ({
                url: shortcuts[i]?.url || '',
            })),
        },
    });

    // 當 dialog 打開時重置表單
    useEffect(() => {
        if (isOpen) {
            reset({
                shortcuts: Array.from({ length: 8 }, (_, i) => ({
                    url: shortcuts[i]?.url || '',
                })),
            });
        }
    }, [isOpen, shortcuts, reset]);

    const onSubmit = (data: FormData) => {
        const validShortcuts: Shortcut[] = [];
        const invalidUrls: string[] = [];

        data.shortcuts.forEach((shortcut, index) => {
            const url = shortcut.url.trim();
            if (url !== '') {
                if (isValidUrl(url)) {
                    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
                    const existingShortcut = shortcuts[index];
                    validShortcuts.push({
                        id: existingShortcut?.id || `${Date.now()}-${index}`,
                        url: urlWithProtocol,
                        title: extractTitleFromUrl(url),
                    });
                } else {
                    invalidUrls.push(`第 ${index + 1} 個網址`);
                }
            }
        });

        if (invalidUrls.length > 0) {
            toast.error(`無效的網址：${invalidUrls.join(', ')}`);
            return;
        }

        setShortcuts(validShortcuts);
        toast.success('快捷連結已儲存');
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
                    <DialogTitle>Shortcuts</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid max-h-96 grid-cols-1 gap-4 overflow-y-auto p-2">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div key={i} className="space-y-2">
                                <Input
                                    id={`url-${i}`}
                                    placeholder="Add shortcuts"
                                    {...register(`shortcuts.${i}.url`)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            取消
                        </Button>
                        <Button type="submit">儲存</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ShortcutsDialog;
