import { create } from 'zustand'
import { supabase, type LeaderboardEntry } from '../lib/supabase'

interface LeaderboardState {
  entries: LeaderboardEntry[]
  loading: boolean
  fetchLeaderboard: () => Promise<void>
  getUserRank: (userId: string) => Promise<number | null>
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  entries: [],
  loading: false,

  fetchLeaderboard: async () => {
    try {
      set({ loading: true })
      
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('rank_position', { ascending: true })
        .limit(100)

      if (error) throw error

      set({ entries: data || [] })
    } catch (error: any) {
      console.error('Erro ao buscar ranking:', error)
    } finally {
      set({ loading: false })
    }
  },

  getUserRank: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('rank_position')
        .eq('user_id', userId)
        .single()

      if (error) throw error
      return data?.rank_position || null
    } catch (error: any) {
      console.error('Erro ao buscar posição do usuário:', error)
      return null
    }
  },
}))