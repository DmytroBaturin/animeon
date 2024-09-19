import { Button } from '@/shared/components/ui/button'
import { useFilterModel } from '@/features/anime/filter/model'

export const FilterAnimeTrigger = () => {
  const { api } = useFilterModel()
  return <Button onClick={api.toggleFilter}>Фільтр</Button>
}
