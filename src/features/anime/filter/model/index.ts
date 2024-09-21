import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ResponseFiltersAnime } from '@/shared/api/model'

interface FilterModel {
  state: {
    isFilterOpen: boolean
    filterList: ResponseFiltersAnime | Record<string, never> // Використовуємо Record для пустого об'єкту
  }
  api: {
    toggleFilter: () => void
    setFilterList: (newFilterList: ResponseFiltersAnime) => void // Додаємо метод setFilterList
  }
}

export const useFilterModel = create<FilterModel>()(
  immer((set) => ({
    state: { isFilterOpen: false, filterList: {} as Record<string, never> },
    api: {
      toggleFilter: () =>
        set((state) => {
          state.state.isFilterOpen = !state.state.isFilterOpen
        }),
      setFilterList: (newFilterList: ResponseFiltersAnime) =>
        set((state) => {
          state.state.filterList = newFilterList
        }),
    },
  })),
)
