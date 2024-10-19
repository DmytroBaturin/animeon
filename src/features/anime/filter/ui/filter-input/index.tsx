import { Input } from '@/shared/components/ui/input'

interface FilterSelectProps {
  placeholder: string
  onChange?: (value: string) => void // змінюємо тип onChange на прийняття значення
  value: string
}

export const FilterInput = ({
  placeholder,
  value,
  onChange,
}: FilterSelectProps) => {
  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => {
        if (e?.target) {
          onChange?.(e.target.value)
        } else {
          console.error('Event target is undefined')
        }
      }}
      value={value}
      widthMain="w-full sm:w-[160px]"
      className="border-white rounded-[7px] w-full sm:w-[160px] bg-primary placeholder:text-white/60"
    />
  )
}
