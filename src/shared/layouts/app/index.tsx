import { ReactNode } from 'react'

interface AppLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export const AppLayout = ({ header, footer, children }: AppLayoutProps) => (
  <div className="flex flex-col min-h-screen ">
    <div className="-z-10 fixed top-0 left-0 w-screen h-screen opacity-10 bg-cover bg-wallpaper" />
    {header}
    <div className="flex-grow pt-[96px] md:pt-[80px] ">{children}</div>
    {footer}
  </div>
)
