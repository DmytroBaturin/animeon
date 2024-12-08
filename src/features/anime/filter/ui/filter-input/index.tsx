import { Input } from '@/shared/components/ui/input'

interface FilterInputProps {
  placeholder: string
  onChange?: (value: string) => void
  value: string
}

export const FilterInput = ({
  placeholder,
  value,
  onChange,
}: FilterInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.value !== undefined) {
      onChange?.(e.target.value)
    }
  }

  return (
    <Input
      widthMain="w-full sm:w-[160px]"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      className="border-white rounded-[7px] w-full sm:w-[160px] bg-primary/70 placeholder:text-white/60"
    />
  )
}
