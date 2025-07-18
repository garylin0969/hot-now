import { ReactNode } from 'react';
import { cn } from '@/utils/shadcn';

interface SectionTitleProps {
    className?: string;
    title?: string;
    children?: ReactNode;
}

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
