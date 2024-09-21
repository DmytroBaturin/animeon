import './globals.css'
import { AppLayout } from '@/shared/layouts/app'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { Exo_2 } from 'next/font/google'

const exo = Exo_2({
  subsets: ['cyrillic', 'latin', 'cyrillic-ext'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />

      <body className={`bg-background ${exo.className}`}>
        <AppLayout header={<Header />} footer={<Footer />}>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
