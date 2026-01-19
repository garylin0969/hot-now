/**
 * @fileoverview 快捷方式狀態管理
 * 使用 Zustand 處理快捷方式的 CRUD 邏輯與持久化存儲。
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Shortcut } from '@/types/shortcuts';
import { createShortcut, updateShortcutById, removeShortcutById } from '@/utils/shortcuts';

/** 本地存儲的鍵名 */
const STORAGE_KEY = 'shortcuts-storage';

/** 快捷方式 Store 的狀態介面 */
interface ShortcutsState {
    /** 快捷方式列表 */
    shortcuts: Shortcut[];
    /** 新增快捷方式 */
    addShortcut: (shortcut: Omit<Shortcut, 'id'>) => void;
    /** 更新指定 ID 的快捷方式 */
    updateShortcut: (id: string, shortcut: Partial<Shortcut>) => void;
    /** 移除指定 ID 的快捷方式 */
    removeShortcut: (id: string) => void;
    /** 批量設定快捷方式 */
    setShortcuts: (shortcuts: Shortcut[]) => void;
    /** 清空所有快捷方式 */
    clearShortcuts: () => void;
    /** 根據 ID 查詢快捷方式 */
    getShortcutById: (id: string) => Shortcut | undefined;
}

/**
 * 快捷方式狀態 Hook
 * 整合了持久化中間件，將狀態存儲於 localStorage。
 */
export const useShortcutsStore = create<ShortcutsState>()(
    persist(
        (set, get) => ({
            shortcuts: [],

            addShortcut: (shortcut) =>
                set((state) => ({
                    shortcuts: [...state.shortcuts, createShortcut(shortcut)],
                })),

            updateShortcut: (id, updatedShortcut) =>
                set((state) => ({
                    shortcuts: updateShortcutById(state.shortcuts, id, updatedShortcut),
                })),

            removeShortcut: (id) =>
                set((state) => ({
                    shortcuts: removeShortcutById(state.shortcuts, id),
                })),

            setShortcuts: (shortcuts) => set({ shortcuts }),

            clearShortcuts: () => set({ shortcuts: [] }),

            getShortcutById: (id) => {
                const { shortcuts } = get();
                return shortcuts.find((shortcut) => shortcut.id === id);
            },
        }),
        { name: STORAGE_KEY }
    )
);
