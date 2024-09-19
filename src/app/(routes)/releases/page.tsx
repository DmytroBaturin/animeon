import { ReleasesPage } from '@/screens/releases/ui'

export default function Page({
  searchParams,
}: {
  searchParams: { tab: string }
}) {
  console.log(searchParams)
  return <ReleasesPage />
}
