import { create } from 'zustand'
import { supabase, type Achievement, type UserAchievement } from '../lib/supabase'
import { useAuthStore } from './authStore'
import toast from 'react-hot-toast'

interface AchievementState {
  achievements: Achievement[]
  userAchievements: UserAchievement[]
  loading: boolean
  fetchAchievements: () => Promise<void>
  fetchUserAchievements: () => Promise<void>
  checkNewAchievements: () => Promise<void>
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  achievements: [],
  userAchievements: [],
  loading: false,

  fetchAchievements: async () => {
    try {
      set({ loading: true })
      
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('points', { ascending: true })

      if (error) throw error

      set({ achievements: data || [] })
    } catch (error: any) {
      console.error('Erro ao buscar conquistas:', error)
    } finally {
      set({ loading: false })
    }
  },

  fetchUserAchievements: async () => {
    try {
      const { user } = useAuthStore.getState()
      if (!user) return

      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements(*)
        `)
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false })

      if (error) throw error

      set({ userAchievements: data || [] })
    } catch (error: any) {
      console.error('Erro ao buscar conquistas do usuário:', error)
    }
  },

  checkNewAchievements: async () => {
    try {
      const { user } = useAuthStore.getState()
      if (!user) return

      // Chamar função do banco para verificar conquistas
      const { error } = await supabase.rpc('check_achievements', {
        user_uuid: user.id
      })

      if (error) throw error

      // Recarregar conquistas do usuário
      await get().fetchUserAchievements()
    } catch (error: any) {
      console.error('Erro ao verificar conquistas:', error)
    }
  },
}))