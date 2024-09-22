import { Player } from '@/features/release/player'

export const runtime = 'edge'

export default function Page({
  params,
}: {
  params: { id: string; slug: string }
}) {
  return <Player {...params} />
}
