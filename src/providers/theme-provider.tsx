'use client';

/**
 * @fileoverview 主題供應器元件
 */
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { ComponentProps } from 'react';

/** 主題供應器屬性型別 */
type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * 封裝 next-themes 的 ThemeProvider
 * 提供全域的主題管理 (Light/Dark mode) 上下文。
 *
 * @param props - 元件屬性 (繼承自 next-themes)
 * @returns 主題供應器
 */
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
