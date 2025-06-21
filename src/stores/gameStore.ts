import { create } from 'zustand'
import { supabase, type GameSession } from '../lib/supabase'
import { useAuthStore } from './authStore'
import { useTimeStore } from './timeStore'
import toast from 'react-hot-toast'

interface GameState {
  currentSession: GameSession | null
  isPlaying: boolean
  startGame: (gameType: string, timeCost: number) => Promise<boolean>
  endGame: (result: string, score: number, won: boolean, multiplier?: number) => Promise<void>
  getGameHistory: () => Promise<GameSession[]>
}

export const useGameStore = create<GameState>((set, get) => ({
  currentSession: null,
  isPlaying: false,

  startGame: async (gameType: string, timeCost: number) => {
    try {
      const { user } = useAuthStore.getState()
      const { spendTime } = useTimeStore.getState()
      
      if (!user) throw new Error('Usuário não autenticado')

      // Verificar e gastar tempo
      const canPlay = await spendTime(timeCost, gameType)
      if (!canPlay) return false

      // Criar sessão de jogo
      const { data, error } = await supabase
        .from('game_sessions')
        .insert({
          user_id: user.id,
          game_type: gameType,
          time_cost: timeCost,
        })
        .select()
        .single()

      if (error) throw error

      set({ currentSession: data, isPlaying: true })
      return true
    } catch (error: any) {
      toast.error(error.message || 'Erro ao iniciar jogo')
      return false
    }
  },

  endGame: async (result: string, score: number, won: boolean, multiplier = 1.0) => {
    try {
      const { currentSession } = get()
      const { user, profile, updateProfile } = useAuthStore.getState()
      
      if (!currentSession || !user || !profile) return

      const endTime = new Date().toISOString()
      const startTime = new Date(currentSession.started_at)
      const durationSeconds = Math.floor((Date.now() - startTime.getTime()) / 1000)

      // Atualizar sessão
      const { error: sessionError } = await supabase
        .from('game_sessions')
        .update({
          result,
          score,
          won,
          multiplier,
          ended_at: endTime,
          duration_seconds: durationSeconds,
        })
        .eq('id', currentSession.id)

      if (sessionError) throw sessionError

      // Atualizar estatísticas do perfil
      const newGamesPlayed = profile.games_played + 1
      const newTotalWins = won ? profile.total_wins + 1 : profile.total_wins
      const pointsEarned = Math.floor(score * multiplier)
      const newTotalPoints = profile.total_points + pointsEarned

      await updateProfile({
        games_played: newGamesPlayed,
        total_wins: newTotalWins,
        total_points: newTotalPoints,
      })

      set({ currentSession: null, isPlaying: false })
      
      if (won) {
        toast.success(`Parabéns! Você ganhou ${pointsEarned} pontos!`)
      } else {
        toast.success(`Jogo finalizado! ${pointsEarned} pontos ganhos.`)
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao finalizar jogo')
    }
  },

  getGameHistory: async () => {
    try {
      const { user } = useAuthStore.getState()
      if (!user) return []

      const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })
        .limit(50)

      if (error) throw error
      return data || []
    } catch (error: any) {
      console.error('Erro ao buscar histórico:', error)
      return []
    }
  },
}))