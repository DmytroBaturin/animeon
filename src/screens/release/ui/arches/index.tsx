'use client'

import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'

interface ReleaseArchesProps {
  id: number
  slug: string
}

export const ReleaseArches = ({ id, slug }: ReleaseArchesProps) => {
  return (
    <div>
      <div className="flex-col flex gap-2">
        <h2 className="font-bold text-xl">Арка 1</h2>
        <div className="w-full flex-wrap flex gap-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <Link href={`${routes.release(id, slug)}?order=${i}`}>
              <Button key={i}>Серія {i}</Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
