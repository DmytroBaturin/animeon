'use client'

import japanIco from '@/shared/assets/Avatar.png'

export const AvatarImage = () => {
  return (
    <div className="w-full flex">
      <svg
        width="100%"
        viewBox="0 0 304 212"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            className="object-cover w-full h-full"
            id="bias"
            patternUnits="objectBoundingBox"
            width="100%"
            height="100%"
          >
            <image href={japanIco.src} width="100%" />
          </pattern>
        </defs>
        <path
          d="M0 0H304V160.5C304 160.5 281 160.5 247.5 170.254C210.982 180.887 181.967 214.547 89.5 211C18.0853 208.261 0 170.254 0 170.254V0Z"
          fill="url(#bias)"
        />
      </svg>
    </div>
  )
}
