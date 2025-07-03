import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Shortcut {
    id: string;
    url: string;
    title: string;
}

interface ShortcutsState {
    shortcuts: Shortcut[];
    addShortcut: (shortcut: Omit<Shortcut, 'id'>) => void;
    updateShortcut: (id: string, shortcut: Partial<Shortcut>) => void;
    removeShortcut: (id: string) => void;
    setShortcuts: (shortcuts: Shortcut[]) => void;
}

export const useShortcutsStore = create<ShortcutsState>()(
    persist(
        (set) => ({
            shortcuts: [],
            addShortcut: (shortcut) =>
                set((state) => ({
                    shortcuts: [...state.shortcuts, { ...shortcut, id: Date.now().toString() }],
                })),
            updateShortcut: (id, updatedShortcut) =>
                set((state) => ({
                    shortcuts: state.shortcuts.map((shortcut) =>
                        shortcut.id === id ? { ...shortcut, ...updatedShortcut } : shortcut
                    ),
                })),
            removeShortcut: (id) =>
                set((state) => ({
                    shortcuts: state.shortcuts.filter((shortcut) => shortcut.id !== id),
                })),
            setShortcuts: (shortcuts) =>
                set(() => ({
                    shortcuts,
                })),
        }),
        {
            name: 'shortcuts-storage',
        }
    )
);
