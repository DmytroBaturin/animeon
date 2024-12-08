'use client'

import React, { ReactNode, useEffect, useRef } from 'react'

interface SliderProps {
  content: ReactNode[]
  activeIndex: number
  setActiveIndex: (index: (prev: number) => number) => void
  handleDotClick?: (index: number) => void
  slideTimer?: number
  className?: string
}

export const Slider = ({
  content,
  activeIndex,
  setActiveIndex,
  slideTimer = 5000,
  className,
}: SliderProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const previousIndexRef = useRef<number>(activeIndex)

  const nextSlide = () => {
    setActiveIndex((prev: number) => (prev + 1) % content.length)
  }

  const restartInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, slideTimer)
  }

  useEffect(() => {
    if (previousIndexRef.current !== activeIndex) {
      restartInterval()
      previousIndexRef.current = activeIndex
    }
  }, [activeIndex])

  useEffect(() => {
    restartInterval()
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [slideTimer, content.length])

  return (
    <div className={className}>
      {content.map((item, index) => (
        <div
          key={index}
          className={`transition-opacity will-change-contents duration-[1s] ${
            activeIndex === index ? 'z-20 opacity-100' : 'z-0 opacity-0'
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
