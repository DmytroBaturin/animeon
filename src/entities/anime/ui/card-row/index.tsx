import { memo } from 'react'

const AnimeCardComponent = () => {
  return (
    <div className="flex gap-3 items-center w-full ">
      <div className="w-9 h-9 bg-pink-400 rounded-full" />
      <div className="flex flex-col font-bold ">
        <h2 className="text-base">Title</h2>
        <p className="text-xs">description</p>
      </div>
    </div>
  )
}

export const AnimeCardRow = memo(AnimeCardComponent)
AnimeCardRow.displayName = 'AnimeCardRow'
