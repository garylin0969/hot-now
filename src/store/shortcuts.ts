import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateShortcutId } from '@/utils/shortcuts';

// 常量
const STORAGE_KEY = 'shortcuts-storage';

export interface Shortcut {
    id: string;
    url: string;
    title: string;
}

// 工具函數
const createShortcut = (shortcut: Omit<Shortcut, 'id'>): Shortcut => ({
    ...shortcut,
    id: generateShortcutId(),
});

const updateShortcutById = (shortcuts: Shortcut[], id: string, updates: Partial<Shortcut>): Shortcut[] => {
    return shortcuts.map((shortcut) => (shortcut.id === id ? { ...shortcut, ...updates } : shortcut));
};

const removeShortcutById = (shortcuts: Shortcut[], id: string): Shortcut[] => {
    return shortcuts.filter((shortcut) => shortcut.id !== id);
};

interface ShortcutsState {
    shortcuts: Shortcut[];
    addShortcut: (shortcut: Omit<Shortcut, 'id'>) => void;
    updateShortcut: (id: string, shortcut: Partial<Shortcut>) => void;
    removeShortcut: (id: string) => void;
    setShortcuts: (shortcuts: Shortcut[]) => void;
    clearShortcuts: () => void;
    getShortcutById: (id: string) => Shortcut | undefined;
}

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
        {
            name: STORAGE_KEY,
        }
    )
);
