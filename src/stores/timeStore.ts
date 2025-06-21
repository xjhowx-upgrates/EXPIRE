import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { useAuthStore } from './authStore'
import toast from 'react-hot-toast'

interface TimeState {
  timeRemaining: number
  lastBonusTime: number
  addTime: (minutes: number, reason: string, gameType?: string) => Promise<void>
  spendTime: (minutes: number, gameType: string) => Promise<boolean>
  checkTimeBonus: () => Promise<void>
  initializeTime: () => Promise<void>
}

export const useTimeStore = create<TimeState>((set, get) => ({
  timeRemaining: 0,
  lastBonusTime: Date.now(),

  addTime: async (minutes: number, reason: string, gameType?: string) => {
    try {
      const { user } = useAuthStore.getState()
      if (!user) throw new Error('Usuário não autenticado')

      // Registrar no histórico
      const { error: trackingError } = await supabase
        .from('time_tracking')
        .insert({
          user_id: user.id,
          time_added: minutes,
          reason,
          game_type: gameType,
        })

      if (trackingError) throw trackingError

      // Atualizar perfil
      const newTime = Math.min(get().timeRemaining + minutes, 480) // Máximo 480 minutos
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ total_time_minutes: newTime })
        .eq('id', user.id)

      if (profileError) throw profileError

      set({ timeRemaining: newTime })
      
      if (reason !== 'Bônus automático por hora') {
        toast.success(`+${minutes} minutos adicionados!`)
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao adicionar tempo')
      throw error
    }
  },

  spendTime: async (minutes: number, gameType: string) => {
    try {
      const { user } = useAuthStore.getState()
      const { timeRemaining } = get()
      
      if (!user) throw new Error('Usuário não autenticado')
      if (timeRemaining < minutes) {
        toast.error('Tempo insuficiente para jogar!')
        return false
      }

      // Registrar gasto de tempo
      const { error: trackingError } = await supabase
        .from('time_tracking')
        .insert({
          user_id: user.id,
          time_added: 0,
          time_spent: minutes,
          reason: `Jogo: ${gameType}`,
          game_type: gameType,
        })

      if (trackingError) throw trackingError

      // Atualizar perfil
      const newTime = timeRemaining - minutes
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ total_time_minutes: newTime })
        .eq('id', user.id)

      if (profileError) throw profileError

      set({ timeRemaining: newTime })
      return true
    } catch (error: any) {
      toast.error(error.message || 'Erro ao gastar tempo')
      return false
    }
  },

  checkTimeBonus: async () => {
    const { lastBonusTime } = get()
    const now = Date.now()
    const hourInMs = 60 * 60 * 1000

    if (now - lastBonusTime >= hourInMs) {
      await get().addTime(10, 'Bônus automático por hora')
      set({ lastBonusTime: now })
    }
  },

  initializeTime: async () => {
    try {
      const { profile } = useAuthStore.getState()
      if (profile) {
        set({ timeRemaining: profile.total_time_minutes })
      }
    } catch (error) {
      console.error('Erro ao inicializar tempo:', error)
    }
  },
}))

// Verificar bônus de tempo a cada minuto
setInterval(() => {
  const { checkTimeBonus } = useTimeStore.getState()
  checkTimeBonus()
}, 60000)