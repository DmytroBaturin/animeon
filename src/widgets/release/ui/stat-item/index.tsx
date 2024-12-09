import { WithIcon } from '@/shared/components/ui/with-icon'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'

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
  const renderLinks = () => {
    if (Array.isArray(data) && data.length > 0) {
      const links = data
        .map((item, index) => {
          if (typeof item === 'object' && item?.get_params) {
            return (
              <Link
                key={index}
                href={`${routes.releases}?${item.get_params}`}
                className="w-full font-bold underline block"
              >
                {parseValue(item)}
              </Link>
            )
          }
          return null
        })
        .filter(Boolean) // Видаляємо всі null значення

      if (links.length > 0) {
        return links
      }
    }

    if (typeof data === 'object' && data?.get_params) {
      return (
        <Link
          href={`${routes.releases}?${data.get_params}`}
          className="w-full font-bold underline"
        >
          {parseValue(data)}
        </Link>
      )
    }

    // Якщо немає даних
    return <span className="w-full font-bold">Немає</span>
  }

  return (
    <div className="flex items-center gap-2">
      <WithIcon classname="w-[70%]" icon={<Image alt={text} src={icon} />}>
        {text}
      </WithIcon>
      <div className="w-full">{renderLinks()}</div>
    </div>
  )
}
