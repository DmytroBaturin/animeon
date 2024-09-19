import { PageLayout } from '@/shared/layouts/page'
import { ReleasePage } from '@/screens/release'
import { ReleaseDetails } from '@/widgets/release'
import { ReleaseTabs } from '@/screens/release/ui/tabs'
import { routes } from '@/shared/config/routes'

export const runtime = 'edge'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string; slug: string }
}) {
  return (
    <PageLayout>
      <ReleasePage
        baseUrl={routes.release(params.id, params.slug)}
        tabs={<ReleaseTabs />}
        details={<ReleaseDetails />}
      >
        {children}
      </ReleasePage>
    </PageLayout>
  )
}
