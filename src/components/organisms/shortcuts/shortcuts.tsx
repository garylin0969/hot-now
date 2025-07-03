'use client';

import { cn } from '@/utils/shadcn';

interface ShortcutsProps {
    className?: string;
}

const Shortcuts = ({ className }: ShortcutsProps) => {
    return <div className={cn(className)}>Shortcuts</div>;
};

export default Shortcuts;
