'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';
import { formatRelativeTime } from '@/utils/date';

interface RelativeTimeProps {
    time: string | number | Date;
    className?: string;
}

const RelativeTime = ({ time, className }: RelativeTimeProps) => {
    const isMounted = useIsMounted();

    if (!isMounted) {
        return null;
    }

    return <span className={className}>{formatRelativeTime(time)}</span>;
};

export default RelativeTime;
