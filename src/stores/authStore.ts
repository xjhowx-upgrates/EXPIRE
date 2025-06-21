import { create } from 'zustand'
import { supabase, type Profile } from '../lib/supabase'
import { User } from '@supabase/supabase-js'
import toast from 'react-hot-toast'

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName?: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  fetchProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        set({ user: data.user })
        await get().fetchProfile()
        toast.success('Login realizado com sucesso!')
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login')
      throw error
    }
  },

  signUp: async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Criar perfil inicial
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            username: fullName?.toLowerCase().replace(/\s+/g, '_'),
          })

        if (profileError) throw profileError

        set({ user: data.user })
        await get().fetchProfile()
        toast.success('Conta criada com sucesso!')
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta')
      throw error
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      set({ user: null, profile: null })
      toast.success('Logout realizado com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer logout')
    }
  },

  updateProfile: async (updates: Partial<Profile>) => {
    try {
      const { user } = get()
      if (!user) throw new Error('Usuário não autenticado')

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error

      await get().fetchProfile()
      toast.success('Perfil atualizado com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar perfil')
      throw error
    }
  },

  fetchProfile: async () => {
    try {
      const { user } = get()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      set({ profile: data })
    } catch (error: any) {
      console.error('Erro ao buscar perfil:', error)
    }
  },
}))

// Inicializar autenticação
supabase.auth.onAuthStateChange(async (event, session) => {
  const { fetchProfile } = useAuthStore.getState()
  
  if (session?.user) {
    useAuthStore.setState({ user: session.user, loading: false })
    await fetchProfile()
  } else {
    useAuthStore.setState({ user: null, profile: null, loading: false })
  }
})