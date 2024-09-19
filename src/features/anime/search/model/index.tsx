import { create } from 'zustand'

interface SearchAnimeState {
  isOpenModal: boolean
  api: {
    openModal: () => void
    closeModal: () => void
  }
}

export const useSearchAnime = create<SearchAnimeState>((set) => ({
  isOpenModal: false,
  api: {
    openModal: () =>
      set((state) => ({
        ...state,
        isOpenModal: true,
      })),
    closeModal: () =>
      set((state) => ({
        ...state,
        isOpenModal: false,
      })),
  },
}))
