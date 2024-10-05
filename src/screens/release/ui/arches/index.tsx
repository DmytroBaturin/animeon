import { Button } from '@/shared/components/ui/button'

export const ReleaseArches = () => {
  return (
    <div>
      <div className="flex-col flex gap-2">
        <h2 className="font-bold text-xl">Арка 1</h2>
        <div className="w-full flex-wrap flex gap-3">
          {Array.from({ length: 100 }).map((_, i) => (
            <Button key={i}>Серія {i}</Button>
          ))}
        </div>
      </div>
    </div>
  )
}
