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
