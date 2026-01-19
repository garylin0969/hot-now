'use client';

/**
 * @fileoverview TanStack Query 供應器元件
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

/** QueryProvider 屬性介面 */
interface QueryProviderProps {
    /** 子元件 */
    children: ReactNode;
}

/**
 * React Query 的全域供應器
 * 配置並初始化 QueryClient，設定預設的 staleTime 和 gcTime 為 30 分鐘。
 * 包含開發工具 (Devtools)。
 *
 * @param props - 元件屬性
 * @returns 包含 Context 的供應器元件
 */
export default function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 30 * 60 * 1000, // 30 minutes
                        gcTime: 30 * 60 * 1000, // 30 minutes
                        retry: 3,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
