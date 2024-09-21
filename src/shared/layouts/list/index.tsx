import { ReactNode } from 'react'

interface ListLayoutProps {
  children: ReactNode
  className?: string
}

export const ListLayout = ({ children, className }: ListLayoutProps) => {
  return (
    <div
      className={`w-[100%] grid h-full justify-center justify-items-center items-center gap-x-2 gap-y-6
        grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      {children}
    </div>
  )
}
