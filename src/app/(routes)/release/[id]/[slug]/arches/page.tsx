import { ReleaseArches } from '@/screens/release'

export const runtime = 'edge'

export default async function Page({
  params,
}: {
  params: { id: number; slug: string }
}) {
  return <ReleaseArches id={params.id} slug={params.slug} />
}
