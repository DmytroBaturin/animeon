import {
  Controls,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  useMediaState,
} from '@vidstack/react'
import '@/shared/components/ui/player.css'
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr'
import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/plyr/theme.css'
import { Button } from '@/shared/components/ui/button'
import { useEffect, useRef, useState } from 'react'

export const ReleasePlayer = ({
  src,
  timemarkers,
}: {
  src: string
  timemarkers?: {
    start_opening: number
    end_opening: number
    start_ending: number
    end_ending: number
  }
}) => {
  const playerRef = useRef<MediaPlayerInstance | null>(null)

  const currentTime = useMediaState('currentTime', playerRef)
  const [showSkipOpeningButton, setShowSkipOpeningButton] = useState(false)
  const [showSkipEndingButton, setShowSkipEndingButton] = useState(false)

  const skipOpening = () => {
    if (playerRef.current && timemarkers) {
      playerRef.current.currentTime = timemarkers.end_opening
    }
  }

  const skipEnding = () => {
    if (playerRef.current && timemarkers) {
      playerRef.current.currentTime = timemarkers.end_ending
    }
  }

  useEffect(() => {
    if (src && timemarkers) {
      const { start_opening, end_opening, start_ending } = timemarkers
      if (currentTime >= start_opening && currentTime <= end_opening) {
        setShowSkipOpeningButton(true)
      } else {
        setShowSkipOpeningButton(false)
      }

      if (currentTime >= start_ending) {
        setShowSkipEndingButton(true)
      } else {
        setShowSkipEndingButton(false)
      }
    }
  }, [currentTime, timemarkers, src])

  return (
    <MediaPlayer ref={playerRef} src={src}>
      <MediaProvider />
      <Controls.Root>
        <PlyrLayout
          markers={[
            {
              label: 'Початок опенінгу',
              time: timemarkers?.start_opening,
            },
            {
              label: 'Кінець опенінгу',
              time: timemarkers?.end_opening,
            },
            {
              label: 'Початок ендінгу',
              time: timemarkers?.start_ending,
            },
            {
              label: 'Кінець ендінгу',
              time: timemarkers?.end_ending,
            },
          ]}
          slots={{
            captionsButton: false,
          }}
          icons={plyrLayoutIcons}
        />
        {showSkipOpeningButton && (
          <Controls.Group className="absolute left-10 bottom-16">
            <Button onClick={skipOpening}>Пропустити опенінг</Button>
          </Controls.Group>
        )}

        {showSkipEndingButton && (
          <Controls.Group className="absolute left-10 bottom-16">
            <Button onClick={skipEnding}>Пропустити ендінг</Button>
          </Controls.Group>
        )}
      </Controls.Root>
    </MediaPlayer>
  )
}
