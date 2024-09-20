'use client'

import * as React from 'react'
import { APITypes, PlyrProps, usePlyr } from 'plyr-react'
import 'plyr/dist/plyr.css'
import Hls from 'hls.js'
import { Options } from 'plyr'
import { forwardRef } from 'react'

const videoSource = undefined

const useHls = (src: string, options?: Options | null) => {
  const hls = React.useRef<Hls>(new Hls())
  const hasQuality = React.useRef<boolean>(false)
  const [plyrOptions, setPlyrOptions] = React.useState<Options | null>(options)

  React.useEffect(() => {
    hasQuality.current = false
  }, [options])

  React.useEffect(() => {
    hls.current.loadSource(src)
    hls.current.attachMedia(document.querySelector('.plyr-react')!)

    hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
      if (hasQuality.current) return

      const { levels } = hls.current
      const quality: Options['quality'] = {
        default: levels.length > 0 ? levels.at(-1)!.height : 0,
        options: levels.map((level) => level.height),
        forced: true,
        onChange: (newQuality: number) => {
          levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              hls.current.currentLevel = levelIndex
            }
          })
        },
      }
      setPlyrOptions({ ...plyrOptions, quality })
      hasQuality.current = true
    })
  })

  return { options: plyrOptions }
}

const CustomPlyrInstance = forwardRef<
  APITypes,
  PlyrProps & { hlsSource: string }
>((props, ref) => {
  const { source, options, hlsSource } = props
  const raptorRef = usePlyr(ref, {
    ...useHls(hlsSource, options),
    source,
  }) as React.MutableRefObject<HTMLVideoElement>

  return (
    <video
      ref={raptorRef}
      className="plyr-react plyr"
      style={{ height: '100%', width: '100%' }}
    >
      <track kind="captions" />
    </video>
  )
})

CustomPlyrInstance.displayName = 'CustomPlyrInstance'

const PlyrComponent = ({
  hlsSource,
  videoOptions,
}: {
  hlsSource: string
  videoOptions: Options
}) => {
  const ref = React.useRef<APITypes>(null)
  const supported = Hls.isSupported()
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div>
      {supported ? (
        <CustomPlyrInstance
          ref={ref}
          source={videoSource}
          options={videoOptions}
          hlsSource={hlsSource}
        />
      ) : (
        'HLS is not supported in your browser'
      )}
    </div>
  )
}

export default PlyrComponent
