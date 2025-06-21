import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isDark: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true, // Tema escuro por padrão
      
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      
      setTheme: (isDark: boolean) => set({ isDark }),
    }),
    {
      name: 'expire-theme',
    }
  )
)