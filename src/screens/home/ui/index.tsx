'use client'

import SliderFullScreen from '@/screens/home/ui/slider'
import { Button } from '@/shared/components/ui/button'
import { Tabs, TabsContent } from '@/shared/components/ui/tabs'
import { PageLayout } from '@/shared/layouts/page'
import { ReactNode, useEffect } from 'react'
import { getAnimePosters } from '@/shared/api/anime/anime'

interface HomePageProps {
  tablist: ReactNode
  activeTab: string
  serverList: ReactNode
}

export const HomePage = ({ tablist, activeTab, serverList }: HomePageProps) => {
  useEffect(() => {
    getAnimePosters().then((res) => console.log(res))
  }, [])
  return (
    <div>
      <SliderFullScreen />
      <PageLayout classname="mt-[20px]">
        <div className="flex flex-col gap-9">
          <Tabs
            className="w-full max-w-full"
            defaultValue={activeTab || 'last'}
          >
            {tablist}
            <TabsContent
              className="py-5 flex flex-col w-full gap-9"
              value={activeTab}
            >
              {serverList}
              <div className="w-full justify-center items-center flex">
                <Button className="w-[190px]">Показати більше</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </div>
  )
}
