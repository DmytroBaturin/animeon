import { getRandomAnime } from '@/shared/api/anime/anime'

export const routes = {
  home: '/',
  releases: '/releases',
  login: '/login',
  profile: '/profile',
  registration: '/registration',
  privacyPolicy: '/privacy-policy',
  owners: '/owners',
  support: '/support',
  release: <T, E>(id: T, slug: E) => `/release/${id}/${slug}`,
}

export const getRandomRoute = async () => {
  const res = await getRandomAnime()
  return `/release/${res.data.id}/${res.data.slug}`
}
