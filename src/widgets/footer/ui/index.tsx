import { PageLayout } from '@/shared/layouts/page'

export const Footer = () => {
  return (
    <footer className="flex items-center w-full h-[96px] bg-gradient-primary">
      <PageLayout>
        <div className="flex justify-between flex-wrap gap-y-4 items-center">
          <nav className="list-none sm:flex-row flex-col wrap font-bold flex gap-x-9">
            <li>Конфіденційність</li>
            <li>Допомога</li>
            <li>Правовласникам</li>
          </nav>
          <div className="flex items-center gap-9">
            <nav className="list-none flex gap-9">
              <li>© 2023 ANIMEON.COM</li>
            </nav>
          </div>
        </div>
      </PageLayout>
    </footer>
  )
}
