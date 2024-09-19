import { PageLayout } from '@/shared/layouts/page'
import { ReleasePage } from '@/screens/release'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string; slug: string }
}) {
  console.log(params)
  return (
    <PageLayout>
      <ReleasePage>{children}</ReleasePage>
    </PageLayout>
  )
}
