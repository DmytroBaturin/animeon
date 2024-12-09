'use client'

import { useRelease } from '@/entities/anime/model'

export const ReleaseTeams = () => {
  const { release } = useRelease()
  console.log(release)
  return (
    <div className="flex-col flex gap-3">
      {release.voiceovers &&
        release.voiceovers.map((voiceover) => (
          <div key={voiceover.get_params} className="flex gap-3 items-center">
            <h3 className="font-bold text-lg">{voiceover.value}</h3>
          </div>
        ))}
    </div>
  )
}
