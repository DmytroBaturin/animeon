import { create } from 'zustand'

interface FilterModel {
  state: {
    isFilterOpen: boolean
  }
  api: {
    toggleFilter: () => void
  }
}

export const useFilterModel = create<FilterModel>((set) => ({
  state: { isFilterOpen: false },
  api: {
    toggleFilter: () =>
      set((state) => ({
        state: { isFilterOpen: !state.state.isFilterOpen },
        api: state.api,
      })),
  },
}))
