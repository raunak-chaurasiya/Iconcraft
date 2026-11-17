import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CustomizerSettings, IconItem, ToastState, ExportFormat } from '../types';

interface StudioState {
  searchQuery: string;
  activeCategory: string;
  settings: CustomizerSettings;
  customIcons: IconItem[];
  selectedIcon: IconItem | null;
  sidebarTab: 'controls' | 'preview';
  trayIcons: IconItem[];
  isTrayOpen: boolean;
  toast: ToastState | null;
  isUploadModalOpen: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  updateSettings: (updates: Partial<CustomizerSettings>) => void;
  setExportFormat: (format: ExportFormat) => void;
  resetSettings: () => void;
  setSelectedIcon: (icon: IconItem | null) => void;
  setSidebarTab: (tab: 'controls' | 'preview') => void;
  toggleTrayIcon: (icon: IconItem) => void;
  removeFromTray: (id: string) => void;
  clearTray: () => void;
  setTrayOpen: (open: boolean) => void;
  addCustomIcon: (icon: IconItem) => void;
  removeCustomIcon: (id: string) => void;
  clearCustomIcons: () => void;
  showToast: (title: string, codeSnippet: string) => void;
  clearToast: () => void;
  setUploadModalOpen: (open: boolean) => void;
}

const DEFAULT_SETTINGS: CustomizerSettings = {
  strokeWidth: 2,
  size: 24,
  strokeLinecap: 'round',
  color: 'currentColor',
  exportFormat: 'tsx',
};

export const useStudioStore = create<StudioState>()(
  persist(
    (set) => ({
      searchQuery: '',
      activeCategory: 'all',
      settings: DEFAULT_SETTINGS,
      customIcons: [],
      selectedIcon: null,
      sidebarTab: 'controls',
      trayIcons: [],
      isTrayOpen: true,
      toast: null,
      isUploadModalOpen: false,

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setActiveCategory: (activeCategory) => set({ activeCategory }),
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),
      setExportFormat: (exportFormat) =>
        set((state) => ({
          settings: { ...state.settings, exportFormat },
        })),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
      setSelectedIcon: (selectedIcon) => set({ selectedIcon, sidebarTab: 'preview' }),
      setSidebarTab: (sidebarTab) => set({ sidebarTab }),

      toggleTrayIcon: (icon) =>
        set((state) => {
          const exists = state.trayIcons.some((i) => i.id === icon.id);
          if (exists) {
            return { trayIcons: state.trayIcons.filter((i) => i.id !== icon.id) };
          }
          return { trayIcons: [...state.trayIcons, icon], isTrayOpen: true };
        }),
      removeFromTray: (id) =>
        set((state) => ({
          trayIcons: state.trayIcons.filter((i) => i.id !== id),
        })),
      clearTray: () => set({ trayIcons: [] }),
      setTrayOpen: (isTrayOpen) => set({ isTrayOpen }),

      addCustomIcon: (icon) =>
        set((state) => ({
          customIcons: [icon, ...state.customIcons],
          selectedIcon: icon,
          activeCategory: 'custom',
        })),
      removeCustomIcon: (id) =>
        set((state) => ({
          customIcons: state.customIcons.filter((i) => i.id !== id),
          selectedIcon: state.selectedIcon?.id === id ? null : state.selectedIcon,
          trayIcons: state.trayIcons.filter((i) => i.id !== id),
        })),
      clearCustomIcons: () => set({ customIcons: [], selectedIcon: null }),
      showToast: (title, codeSnippet) =>
        set({
          toast: {
            id: Math.random().toString(36).substring(2, 9),
            title,
            codeSnippet,
          },
        }),
      clearToast: () => set({ toast: null }),
      setUploadModalOpen: (isUploadModalOpen) => set({ isUploadModalOpen }),
    }),
    {
      name: 'iconcraft-studio-storage',
      partialize: (state) => ({
        settings: state.settings,
        customIcons: state.customIcons,
        trayIcons: state.trayIcons,
      }),
    }
  )
);
