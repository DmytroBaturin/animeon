import { create } from 'zustand'

interface SessionState {
  isAuthenticated: boolean
  token: string

  setSession: (isAuthenticated: boolean, token: string) => void
}

export const useSession = create<SessionState>((set) => ({
  isAuthenticated: false,
  token: '',
  setSession: (isAuthenticated: boolean, token: string) => {
    set({
      isAuthenticated,
      token,
    })
  },
}))
