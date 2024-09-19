import './globals.css'
import { AppLayout } from '@/shared/layouts/app'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="bg-background">
        <AppLayout header={<Header />} footer={<Footer />}>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
