'use client'

import { useRelease } from '@/entities/anime/model'
import { AspectRatio } from '@/shared/components/ui/aspect-ratio'

export const TrailerRelease = () => {
  const { release } = useRelease()

  return (
    <AspectRatio ratio={16 / 9} className="bg-muted h">
      {release?.trailer_url ? (
        <iframe
          src={release.trailer_url}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-sm text-muted-foreground">
            Немає трейлера для цього аніме
          </span>
        </div>
      )}
    </AspectRatio>
  )
}
