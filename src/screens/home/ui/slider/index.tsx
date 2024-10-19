import React, { useRef, useState } from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import type { ResponsePosters } from '@/shared/api/model'
import { Button } from '@/shared/components/ui/button'
import { PageLayout } from '@/shared/layouts/page'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'

const slides = ['https://via.placeholder.com/1920x1080?text=Slide+1']

const SliderFullScreen = ({ posters }: { posters?: ResponsePosters[] }) => {
  const sliderRef = useRef<Slider | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const settings = {
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnChange: false,
    focusOnSelect: false,
    touchMove: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
  }

  const goToSlide = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index)
    }
  }

  return (
    <div className="relative  left-0 -mt-[96px] md:-mt-[80px] h-dvh w-full overflow-hidden flex justify-center items-center">
      <Slider className="w-full h-full" ref={sliderRef} {...settings}>
        {posters && posters.length > 0 ? (
          posters.map((poster, index) => {
            const imageSrc =
              poster.image && poster.image !== '' ? poster.image : slides[0]

            return (
              <div
                key={`${poster.anime?.id}-${poster.anime?.slug}-${index}`}
                className="relative w-full h-dvh"
              >
                <Image
                  src={imageSrc}
                  className="absolute top-0 gradient-mask-b-0 left-0 w-full h-full object-cover"
                  alt={`Slide ${index + 1}`}
                  layout="fill"
                  priority
                />
                <PageLayout classname="absolute bottom-[10%] md:bottom-[20%] z-10 w-full text-center">
                  <div className="flex gap-2 items-start flex-col justify-center">
                    <h2 className="font-bold text-3xl text-white drop-shadow-sm">
                      {poster.anime?.title || 'Назва аніме'}
                    </h2>
                    <p className="font-bold text-base text-white drop-shadow-sm">
                      {poster.anime?.count_episodes || 'Назва аніме'}
                    </p>
                    <div className="flex gap-2">
                      {posters.map((_, index) => (
                        <Button
                          key={`${poster.anime?.id}-${poster.anime?.slug}-${index}`}
                          onClick={(e) => goToSlide(index, e)}
                          className={`h-2 w-[25px] p-0 rounded-full drop-shadow-sm ${
                            index === activeSlide ? 'bg-accent' : 'bg-[#939393]'
                          }`}
                        />
                      ))}
                    </div>
                    <Link
                      passHref
                      href={routes.release(
                        poster.anime?.id || '',
                        poster.anime?.slug || '',
                      )}
                    >
                      <Button className="mt-2">Перейти на аніме</Button>
                    </Link>
                  </div>
                </PageLayout>
              </div>
            )
          })
        ) : (
          <div className="relative w-full h-dvh">
            <Image
              src={slides[0]}
              className="absolute top-0 left-0 w-full h-full object-cover"
              alt="Slide"
              layout="fill"
              priority
            />
          </div>
        )}
      </Slider>
    </div>
  )
}

export default SliderFullScreen
