import { create } from 'zustand'
import { User } from '@/shared/api/model'

interface UserState {
  user: User
  api: {
    setUser: (user: User) => void
    setAvatar: (avatar: string) => void
  }
}

export const useUser = create<UserState>((set) => ({
  user: {} as User,
  api: {
    setUser: (user) => set({ user }),
    setAvatar: (avatar) =>
      set((state) => ({
        user: {
          ...state.user,
          avatar,
        },
      })),
  },
}))
