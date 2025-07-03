import { Badge } from '@/components/ui/badge';
import type { KomicaTrend } from '@/types';

interface KomicaListProps {
    className?: string;
    trends: KomicaTrend[];
}

const KomicaList = ({ className, trends }: KomicaListProps) => {
    return (
        <div className={className}>
            <div className="space-y-3">
                {trends.map((trend) => (
                    <a
                        key={trend.link}
                        href={trend.link}
                        className="group block border-b pb-3 last:border-b-0"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex items-start gap-3">
                            <Badge variant="secondary">{trend.replyCount} 回應</Badge>
                            <div className="flex-1">
                                <h3 className="group-hover:text-primary line-clamp-1 font-semibold">
                                    {trend.title}...
                                </h3>
                                <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                                    {trend.description}...
                                </p>
                                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                                    <span>{trend.date}</span>
                                    <span>{trend.time}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default KomicaList;
