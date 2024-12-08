'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ChildPreviewImage } from '@/shared/api/model'
import { Slider } from '@/shared/components/ui/slider'

export const AnimeSlider = ({ data }: { data: ChildPreviewImage[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className="relative">
      {data && (
        <Slider
          setActiveIndex={setActiveIndex}
          className="w-full h-[200px]"
          slideTimer={5000}
          content={data.map(
            (image) =>
              image.file && (
                <Image
                  className="w-full h-full absolute object-cover rounded-xl"
                  key={image.file}
                  quality={100}
                  src={image.file}
                  width={100}
                  height={100}
                  alt="Image"
                />
              ),
          )}
          activeIndex={activeIndex}
        />
      )}
    </div>
  )
}
