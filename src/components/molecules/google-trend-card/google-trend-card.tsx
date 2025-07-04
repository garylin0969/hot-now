// import CopyToClipboard from '@/components/atoms/copy-to-clipboard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GoogleTrend } from '@/types';

interface GoogleTrendCardProps {
    trend: GoogleTrend;
}

const GoogleTrendCard = ({ trend }: GoogleTrendCardProps) => {
    return (
        <Card className="flex flex-col gap-y-1 py-3 transition-shadow duration-200 hover:shadow-lg md:flex-row md:items-center md:justify-between md:gap-y-0">
            <CardHeader className="flex-1 gap-0">
                <CardTitle className="text-foreground text-lg font-semibold">{trend.googleTrend}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-2 items-center">
                <div className="flex flex-1 items-center">
                    <span className="text-muted-foreground text-sm">搜尋量：</span>
                    <Badge variant="outline">{trend.searchVolume}</Badge>
                </div>
                <div className="flex flex-1 items-center justify-end">
                    <span className="text-muted-foreground text-sm">已開始：</span>
                    <span className="text-muted-foreground text-sm">{trend.started}</span>
                </div>
                {/* <CopyToClipboard text={trend?.googleTrend} /> */}
            </CardContent>
        </Card>
    );
};

export default GoogleTrendCard;
