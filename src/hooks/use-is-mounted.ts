'use client';

/**
 * @fileoverview 客戶端掛載狀態 Hook
 * 提供一個安全的方式來檢測元件是否已在客戶端掛載完成，
 * 用於解決 Radix UI 等函式庫在 SSR 時產生的 hydration mismatch 問題。
 */
import { useSyncExternalStore } from 'react';

/**
 * 空函式，用於 useSyncExternalStore 的 subscribe 參數
 * 由於掛載狀態不會改變，不需要實際的訂閱邏輯
 */
const emptySubscribe = () => () => {};

/**
 * 檢查元件是否已在客戶端掛載完成的 Hook
 * 使用 useSyncExternalStore 以符合 React 19 的最佳實踐，
 * 避免在 useEffect 中直接呼叫 setState。
 *
 * @returns 若已在客戶端掛載則返回 true，否則返回 false
 *
 * @example
 * const isMounted = useIsMounted();
 * if (!isMounted) return <Skeleton />;
 * return <RadixUIComponent />;
 */
export const useIsMounted = (): boolean => {
    return useSyncExternalStore(
        emptySubscribe,
        () => true, // 客戶端快照：總是返回 true
        () => false // 伺服器快照：總是返回 false
    );
};
