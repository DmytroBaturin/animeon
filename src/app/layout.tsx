import './globals.css'
import { AppLayout } from '@/shared/layouts/app'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { Exo_2 } from 'next/font/google'
import { validateAccessCookie } from '@/shared/api/token'
import { cookies } from 'next/headers'

const exo = Exo_2({
  subsets: ['cyrillic', 'latin', 'cyrillic-ext'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = cookies().get('accessToken')?.value
  const isAuth = await validateAccessCookie(token)

  console.log(isAuth)

  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />

      <body className={`bg-background ${exo.className}`}>
        <AppLayout header={<Header isAuth={isAuth} />} footer={<Footer />}>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
