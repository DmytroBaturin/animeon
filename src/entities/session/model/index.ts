import { create } from 'zustand'

interface AuthStoreState {
  isOpen: boolean
  isLogin: boolean
  openDialog: () => void
  closeDialog: () => void
  togglePage: () => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isOpen: false,
  isLogin: true,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  togglePage: () => set((state) => ({ isLogin: !state.isLogin })),
}))
