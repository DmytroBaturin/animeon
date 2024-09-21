import { WithIcon } from '@/shared/components/ui/with-icon'
import Image from 'next/image'

type ParsedDataValue = string | { value?: string; get_params?: string }

const parseValue = (item: ParsedDataValue): string => {
  if (typeof item === 'string') {
    return item
  }
  if (item && typeof item === 'object') {
    return item.value || 'Невідомо'
  }
  return 'Невідомо'
}

export const StatItem = ({
  icon,
  text,
  data,
}: {
  icon: string
  text: string
  data: ParsedDataValue | ParsedDataValue[]
}) => {
  const displayValue = Array.isArray(data)
    ? data
        .map(
          (item, index) =>
            `${parseValue(item)}${index < data.length - 1 ? ', ' : ''}`,
        )
        .join('')
    : parseValue(data)

  return (
    <div className="flex items-center gap-2">
      <WithIcon classname="w-[70%]" icon={<Image alt={text} src={icon} />}>
        {text}
      </WithIcon>
      <span className="w-full font-bold">{displayValue || 'Немає даних'}</span>
    </div>
  )
}
