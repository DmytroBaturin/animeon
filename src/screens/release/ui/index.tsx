'use client'

import { ReactNode, useEffect } from 'react'
import { Tabs, TabsContent } from '@/shared/components/ui/tabs'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'

interface ReleasePageProps {
  children: ReactNode
  details: ReactNode
  tabs: ReactNode
  baseUrl: string
}

export const ReleasePage = ({
  children,
  details,
  baseUrl,
  tabs,
}: ReleasePageProps) => {
  const router = useRouter()

  const activeTab = useSelectedLayoutSegment() || ''

  const handleNavigationClick = (key: string) => {
    router.push(`${baseUrl}/${key}`, { scroll: false })
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div className="w-full mt-10">
      {details}
      <Tabs
        value={activeTab}
        onValueChange={handleNavigationClick}
        className="mt-4 rounded-[30px] px-[10%] py-[10px] lg:h-full lg:min-h-[650px] md:mt-6 bg-muted"
      >
        {tabs}
        <TabsContent value={activeTab}>{children}</TabsContent>
      </Tabs>
    </div>
  )
}
