'use server'

import { PageLayout } from '@/shared/layouts/page'
import { ReleasePage } from '@/screens/release'
import { ReleaseDetails } from '@/widgets/release'
import { ReleaseTabs } from '@/screens/release/ui/tabs'
import { routes } from '@/shared/config/routes'
import { getAnime } from '@/shared/api/anime/anime'
import { ReleaseInitializer } from '@/entities/anime/model/initializer/release'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: number; slug: string }
}) {
  const anime = await getAnime(params.id, params.slug)

  return (
    <PageLayout>
      <ReleaseInitializer data={anime.data}>
        <ReleasePage
          baseUrl={routes.release(params.id, params.slug)}
          tabs={<ReleaseTabs />}
          details={<ReleaseDetails anime={anime.data} />}
        >
          {children}
        </ReleasePage>
      </ReleaseInitializer>
    </PageLayout>
  )
}
