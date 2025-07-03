import { Badge } from '@/components/ui/badge';
import type { KomicaTrend } from '@/types';

interface KomicaListProps {
    trends: KomicaTrend[];
}

const KomicaList: React.FC<KomicaListProps> = ({ trends }) => {
    return (
        <div className="mx-auto max-w-4xl">
            <div className="space-y-3">
                {trends.map((trend) => (
                    <div key={trend.link} className="border-b pb-3 last:border-b-0">
                        <div className="flex items-start gap-3">
                            <Badge variant="secondary">{trend.replyCount} 回應</Badge>
                            <div className="flex-1">
                                <h3 className="font-semibold">
                                    <a
                                        href={trend.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {trend.title}
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mt-1 text-sm">{trend.description}</p>
                                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                                    <span>{trend.date}</span>
                                    <span>{trend.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KomicaList;
