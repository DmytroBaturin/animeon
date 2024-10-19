'use client'

import { useRelease } from '@/entities/anime/model'
import { ReleaseSimilar } from '@/screens/release'

export const runtime = 'edge'

export default function Page() {
  const { release } = useRelease()
  return <ReleaseSimilar list={release.similar} />
}
