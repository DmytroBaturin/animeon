'use client'

import { TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useRouter } from 'next/navigation'

export interface TabParamsProps {
  label: string
  value: string
}

export const HomeTabList = ({ tabs }: { tabs: TabParamsProps[] }) => {
  const router = useRouter()

  const handleTabChange = (tabValue: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set('tab', tabValue)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <TabsList className="max-w-[400px] h-full grid grid-cols-3 w-full">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          value={tab.value}
        >
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
