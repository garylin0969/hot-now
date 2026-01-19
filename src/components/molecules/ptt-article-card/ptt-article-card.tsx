import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { PttArticle } from '@/types';
import { formatRelativeTime } from '@/utils/date';
import { formatCompactNumber } from '@/utils/number';
import { cn } from '@/utils/shadcn';

/** 推薦分數閾值 */
const SCORE_THRESHOLDS = {
    HIGH: 100,
    MEDIUM: 50,
    LOW: 10,
} as const;

/** 推薦分數顏色 */
const SCORE_COLORS = {
    HIGH: 'text-red-500',
    MEDIUM: 'text-orange-500',
    LOW: 'text-green-500',
    NEGATIVE: 'text-gray-500',
} as const;

/** 樣式常量 */
const STYLES = {
    cardHeight: 'h-[120px] sm:h-[140px]',
    textMuted: 'text-muted-foreground text-xs',
    badgeText: 'text-xs',
} as const;

/**
 * 格式化推薦分數顯示
 *
 * @param score - 推薦分數
 * @returns 包含顯示文字與顏色的物件
 */
const formatRecommendScore = (score: string): { display: string; color: string } => {
    const scoreNum = parseInt(score, 10);

    if (scoreNum > SCORE_THRESHOLDS.HIGH) {
        return { display: scoreNum.toString(), color: SCORE_COLORS.HIGH };
    }
    if (scoreNum > SCORE_THRESHOLDS.MEDIUM) {
        return { display: scoreNum.toString(), color: SCORE_COLORS.MEDIUM };
    }
    if (scoreNum > SCORE_THRESHOLDS.LOW) {
        return { display: scoreNum.toString(), color: SCORE_COLORS.LOW };
    }
    return { display: scoreNum.toString(), color: SCORE_COLORS.NEGATIVE };
};

/**
 * PTT 文章卡片元件的屬性介面
 */
interface PttArticleCardProps {
    /** PTT 文章資料 */
    article: PttArticle;
}

/**
 * 顯示 PTT 熱門文章的卡片元件
 *
 * @param props - 元件屬性
 * @param props.article - 文章資料
 * @returns 渲染後的文章卡片
 */
const PttArticleCard = ({ article }: PttArticleCardProps) => {
    const pttUrl = `https://www.pttweb.cc${article.link}`;
    const { display: scoreDisplay, color: scoreColor } = formatRecommendScore(article.recommendScore);
    const scoreNum = parseInt(article.recommendScore, 10);
    const formattedTime = formatRelativeTime(article.publishTime);
    const formattedCount = formatCompactNumber(article.recommendCount);

    return (
        <a href={pttUrl} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <CardContent className={cn('flex flex-col justify-between p-3 sm:p-4', STYLES.cardHeight)}>
                    <div>
                        <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
                            <Badge variant="secondary" className={STYLES.badgeText}>
                                {article.board}
                            </Badge>
                            <span className={cn('hidden sm:inline', STYLES.textMuted)}>by {article.author}</span>
                            <span className={STYLES.textMuted}>{formattedTime}</span>
                        </div>
                        <div className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-semibold transition-colors sm:text-base lg:text-lg">
                            {article.title}
                        </div>
                    </div>
                    <div className={cn('mt-2 flex items-center gap-2 sm:gap-4 sm:text-sm', STYLES.textMuted)}>
                        <div className="flex items-center gap-1">
                            <span className={cn('font-bold', scoreColor)}>{scoreDisplay}</span>
                            <span className="hidden sm:inline">{scoreNum > 0 ? '推' : '噓'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>💬</span>
                            <span className="hidden sm:inline">{formattedCount} 留言</span>
                            <span className="sm:hidden">{formattedCount}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
};

export default PttArticleCard;
