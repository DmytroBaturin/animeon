'use client'

import { UserAvatar } from '@/entities/user'
import { useRelease } from '@/entities/anime/model'

export const ReleaseTeams = () => {
  const { release } = useRelease()

  console.log(release.studio)
  return (
    <div className="flex-col flex gap-3">
      {release.studio &&
        release.studio.map((studio) => (
          <div key={studio.get_params} className="flex gap-3 items-center">
            <UserAvatar />
            <h3 className="font-bold text-lg">{studio.value}</h3>
          </div>
        ))}
    </div>
  )
}
