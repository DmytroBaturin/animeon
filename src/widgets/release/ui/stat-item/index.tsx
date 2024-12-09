import { WithIcon } from '@/shared/components/ui/with-icon'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/shared/config/routes' // Імпортуємо Link

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

// Функція для отримання першого get_params з data
const getFirstParam = (data: ParsedDataValue | ParsedDataValue[]) => {
  if (Array.isArray(data)) {
    const itemWithParam = data.find(
      (item) => typeof item === 'object' && item?.get_params,
    )
    return itemWithParam?.get_params || ''
  }
  if (typeof data === 'object' && data?.get_params) {
    return data.get_params
  }
  return ''
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
  const hasParams = Array.isArray(data)
    ? data.some((item) => typeof item === 'object' && item?.get_params)
    : typeof data === 'object' && data?.get_params

  const displayValue = Array.isArray(data)
    ? data
        .map(
          (item, index) =>
            `${parseValue(item)}${index < data.length - 1 ? ', ' : ''}`,
        )
        .join('')
    : parseValue(data)

  const getParamsValue = getFirstParam(data) // Отримуємо перший get_params

  return (
    <div className="flex items-center gap-2">
      <WithIcon classname="w-[70%]" icon={<Image alt={text} src={icon} />}>
        {text}
      </WithIcon>
      {hasParams && getParamsValue ? (
        <Link
          href={`${routes.releases}?${getParamsValue}`}
          className="w-full font-bold underline"
        >
          {displayValue || 'Немає даних'}
        </Link>
      ) : (
        <span className="w-full font-bold">
          {displayValue || 'Немає даних'}
        </span>
      )}
    </div>
  )
}
