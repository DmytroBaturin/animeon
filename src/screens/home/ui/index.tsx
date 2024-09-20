'use client'

import SliderFullScreen from '@/screens/home/ui/slider'
import { Button } from '@/shared/components/ui/button'
import { Tabs, TabsContent } from '@/shared/components/ui/tabs'
import { PageLayout } from '@/shared/layouts/page'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'

interface HomePageProps {
  tablist: ReactNode
  activeTab: string
  serverList: ReactNode
}

export const HomePage = ({ tablist, activeTab, serverList }: HomePageProps) => {
  const router = useRouter()

  const handleTabChange = (tabValue: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set('tab', tabValue)

    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div>
      <SliderFullScreen />
      <PageLayout classname="mt-[20px]">
        <div className="flex flex-col gap-9">
          <Tabs
            className="w-full max-w-full"
            defaultValue={activeTab || 'last'}
            onValueChange={handleTabChange}
          >
            {tablist}
            <TabsContent
              className="py-5 flex flex-col w-full gap-9"
              value={activeTab}
            >
              {serverList}
              <div className="w-full justify-center items-center flex">
                <Link href={routes.releases}>
                  <Button className="w-[190px]">Показати більше</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </div>
  )
}
