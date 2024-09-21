'use client'

import SliderFullScreen from '@/screens/home/ui/slider'
import { Button } from '@/shared/components/ui/button'
import { Tabs, TabsContent } from '@/shared/components/ui/tabs'
import { PageLayout } from '@/shared/layouts/page'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'
import { ResponsePosters } from '@/shared/api/model'

interface HomePageProps {
  tablist: ReactNode
  activeTab: string
  serverList: ReactNode
  posters: ResponsePosters[]
}

export const HomePage = ({
  tablist,
  posters,
  activeTab,
  serverList,
}: HomePageProps) => {
  const router = useRouter()

  const handleTabChange = (tabValue: string) => {
    router.push(`?tab=${tabValue.toString()}`, { scroll: false })
  }

  return (
    <div>
      <SliderFullScreen posters={posters} />
      <PageLayout classname="mt-[20px]">
        <div className="flex flex-col gap-9">
          <Tabs
            className="w-full max-w-full"
            defaultValue={activeTab || ''}
            onValueChange={handleTabChange}
          >
            {tablist}
            <TabsContent
              className="py-5 flex flex-col sm:min-h-[800px] min-h-[680px] w-full gap-9"
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
