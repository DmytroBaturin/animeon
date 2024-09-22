import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

interface FilterSelectProps {
  placeholder: string
  options: { [key: string]: unknown | string }
  onChange?: (key: string) => void
  value: string
}

export const FilterSelect = ({
  placeholder,
  options,
  value,
  onChange,
}: FilterSelectProps) => {
  const orderedOptions = Object.entries(options).sort(([keyA], [keyB]) => {
    if (keyA === '') return -1
    if (keyB === '') return 1
    return 0
  })

  const selectedValue = (options[value] as string) || ''

  return (
    <Select
      onValueChange={(selectedValue) => {
        const selectedKey =
          Object.keys(options).find((key) => options[key] === selectedValue) ||
          ''

        onChange?.(selectedKey)
      }}
      value={selectedValue as string}
    >
      <SelectTrigger className="bg-primary/70 w-full sm:w-[160px]">
        <SelectValue placeholder={placeholder}>
          {placeholder}: {selectedValue}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {orderedOptions.map(([key, value]) => (
          <SelectItem key={key} value={value as string}>
            {value as string}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
