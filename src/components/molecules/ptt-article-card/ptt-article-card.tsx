import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { PttArticle } from '@/types';
import { cn } from '@/utils/shadcn';

// 格式化推薦分數顯示
const formatRecommendScore = (score: string): { display: string; color: string } => {
    const scoreNum = parseInt(score);
    if (scoreNum > 100) {
        return { display: scoreNum.toString(), color: 'text-red-500' };
    } else if (scoreNum > 50) {
        return { display: scoreNum.toString(), color: 'text-orange-500' };
    } else if (scoreNum > 10) {
        return { display: scoreNum.toString(), color: 'text-green-500' };
    } else if (scoreNum < 0) {
        return { display: scoreNum.toString(), color: 'text-gray-500' };
    } else {
        return { display: scoreNum.toString(), color: 'text-gray-500' };
    }
};

// 格式化發布時間
const formatPublishedTime = (publishTime: string): string => {
    try {
        // PTT 時間格式: "2025/07/03 03:43"
        const [datePart, timePart] = publishTime.split(' ');
        const [year, month, day] = datePart.split('/');
        const [hour, minute] = timePart.split(':');

        const published = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            parseInt(hour),
            parseInt(minute)
        );
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);

        const TIME_CONSTANTS = {
            MINUTE: 60,
            HOUR: 3600,
            DAY: 86400,
            MONTH: 86400 * 30,
        };

        if (diffInSeconds < TIME_CONSTANTS.HOUR) {
            const minutes = Math.floor(diffInSeconds / TIME_CONSTANTS.MINUTE);
            return `${minutes} 分鐘前`;
        } else if (diffInSeconds < TIME_CONSTANTS.DAY) {
            const hours = Math.floor(diffInSeconds / TIME_CONSTANTS.HOUR);
            return `${hours} 小時前`;
        } else if (diffInSeconds < TIME_CONSTANTS.MONTH) {
            const days = Math.floor(diffInSeconds / TIME_CONSTANTS.DAY);
            return `${days} 天前`;
        } else {
            const months = Math.floor(diffInSeconds / TIME_CONSTANTS.MONTH);
            return `${months} 個月前`;
        }
    } catch {
        return publishTime; // 如果解析失敗，返回原始時間
    }
};

// 格式化推薦數量
const formatRecommendCount = (count: string): string => {
    const num = parseInt(count);
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
};

interface PttArticleCardProps {
    article: PttArticle;
}

const PttArticleCard = ({ article }: PttArticleCardProps) => {
    const pttUrl = `https://www.ptt.cc${article.link}.html`;
    const { display: scoreDisplay, color: scoreColor } = formatRecommendScore(article.recommendScore);

    // 提取重複的樣式類名
    const cardHeightClasses = 'h-[120px] sm:h-[140px]';
    const textMutedClasses = 'text-muted-foreground text-xs';
    const badgeTextClasses = 'text-xs';

    return (
        <a href={pttUrl} target="_blank" rel="noopener noreferrer">
            <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <CardContent className={cn('flex flex-col justify-between p-3 sm:p-4', cardHeightClasses)}>
                    <div>
                        <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
                            <Badge variant="secondary" className={badgeTextClasses}>
                                {article.board}
                            </Badge>
                            <span className={cn('hidden sm:inline', textMutedClasses)}>by {article.author}</span>
                            <span className={textMutedClasses}>{formatPublishedTime(article.publishTime)}</span>
                        </div>
                        <h3 className="hover:text-primary line-clamp-2 text-sm leading-tight font-semibold transition-colors sm:text-base lg:text-lg">
                            {article.title}
                        </h3>
                    </div>
                    <div className={cn('mt-2 flex items-center gap-2 sm:gap-4 sm:text-sm', textMutedClasses)}>
                        <div className="flex items-center gap-1">
                            <span className={cn('font-bold', scoreColor)}>{scoreDisplay}</span>
                            <span className="hidden sm:inline">{parseInt(scoreDisplay) > 0 ? '推' : '噓'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>💬</span>
                            <span className="hidden sm:inline">
                                {formatRecommendCount(article.recommendCount)} 留言
                            </span>
                            <span className="sm:hidden">{formatRecommendCount(article.recommendCount)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
};

export default PttArticleCard;
