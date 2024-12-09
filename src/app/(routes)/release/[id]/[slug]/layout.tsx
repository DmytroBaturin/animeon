import { PageLayout } from '@/shared/layouts/page'
import { ReleasePage } from '@/screens/release'
import { ReleaseDetails } from '@/widgets/release'
import { ReleaseTabs } from '@/screens/release/ui/tabs'
import { routes } from '@/shared/config/routes'
import { getAnime } from '@/shared/api/anime/anime'
import { ReleaseInitializer } from '@/entities/anime/model/initializer/release'
import Image from 'next/image'
import { ErrorBoundary } from 'react-error-boundary'

export const generateMetadata = async ({
  params,
}: {
  params: { id: number; slug: string }
}) => {
  const episodeData = await getAnime(params.id, params.slug, {
    cache: 'no-cache',
  })

  return {
    title: `Дивитися епізод ${episodeData.data.title} онлайн`,
    description: `Дивіться аніме ${episodeData.data.title} з озвучкою та субтитрами. Найкраща якість відео та оновлення епізодів.`,
    openGraph: {
      title: `Дивитися епізод ${episodeData.data.title} онлайн`,
      description: `Дивіться аніме ${episodeData.data.title} у високій якості.`,
      images: [
        {
          url: episodeData.data.background_image || '/default-preview.jpg',
          width: 1200,
          height: 630,
          alt: episodeData.data.title,
        },
      ],
    },
  }
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: number; slug: string }
}) {
  const anime = await getAnime(params.id, params.slug)
  return (
    <ErrorBoundary
      fallback={
        <div className="flex items-center py-4 justify-center h-full">
          <span className="text-sm text-muted-foreground">
            Щось пішло не так
          </span>
        </div>
      }
    >
      <PageLayout>
        {anime.data.card_image && (
          <Image
            src={anime.data.card_image}
            height={400}
            width={500}
            alt="background"
            className="absolute right-0 top-[20px] gradient-mask-b-0 w-full h-[400px] object-cover"
          />
        )}

        <ReleaseInitializer data={anime.data}>
          <ReleasePage
            baseUrl={routes.release(params.id, params.slug)}
            tabs={<ReleaseTabs />}
            details={<ReleaseDetails anime={anime.data} />}
          >
            {children}
          </ReleasePage>
        </ReleaseInitializer>
      </PageLayout>
    </ErrorBoundary>
  )
}
