import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GoogleTrend } from '@/types';

interface GoogleTrendCardProps {
    trend: GoogleTrend;
}

const GoogleTrendCard = ({ trend }: GoogleTrendCardProps) => {
    return (
        <Card className="flex flex-row items-center justify-between transition-shadow duration-200 hover:shadow-lg">
            <CardHeader className="flex-1">
                <CardTitle className="text-foreground text-lg font-semibold">{trend.googleTrend}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-x-4">
                <div className="flex items-center gap-4">
                    <span className="text-muted-foreground text-sm">搜尋量</span>
                    <Badge variant="outline">{trend.searchVolume}</Badge>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-muted-foreground text-sm">已開始</span>
                    <span className="text-muted-foreground text-sm">{trend.started}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default GoogleTrendCard;
