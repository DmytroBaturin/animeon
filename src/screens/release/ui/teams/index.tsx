'use client'

import { useRelease } from '@/entities/anime/model'
import { WithIcon } from '@/shared/components/ui/with-icon'
import Image from 'next/image'

export const ReleaseTeams = () => {
  const { release } = useRelease()

  return (
    <div className="flex-col flex gap-3">
      {release.voiceovers &&
        release.voiceovers.map((voiceover) => (
          <div key={voiceover.get_params} className="flex gap-3 items-center">
            <WithIcon
              icon={
                voiceover.avatar && (
                  <Image
                    className="rounded-full w-[45px] h-[45px]"
                    src={voiceover.avatar}
                    alt={voiceover.value}
                  />
                )
              }
            >
              <h3 className="font-bold text-lg">{voiceover.value}</h3>
            </WithIcon>
          </div>
        ))}
    </div>
  )
}
