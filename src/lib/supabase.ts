import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para o banco de dados
export interface Profile {
  id: string
  email: string
  username?: string
  full_name?: string
  avatar_url?: string
  total_time_minutes: number
  total_points: number
  games_played: number
  total_wins: number
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  rarity: 'Comum' | 'Raro' | 'Épico' | 'Lendário'
  points: number
  icon?: string
  condition_type: string
  condition_value: number
  created_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  unlocked_at: string
  achievement?: Achievement
}

export interface GameSession {
  id: string
  user_id: string
  game_type: string
  time_cost: number
  result?: string
  score: number
  multiplier: number
  won: boolean
  started_at: string
  ended_at?: string
  duration_seconds?: number
}

export interface TimeTracking {
  id: string
  user_id: string
  time_added: number
  time_spent: number
  reason: string
  game_type?: string
  created_at: string
}

export interface LeaderboardEntry {
  id: string
  user_id: string
  username: string
  total_points: number
  games_played: number
  win_rate: number
  achievements_count: number
  rank_position?: number
  updated_at: string
}