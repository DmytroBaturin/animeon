export const routes = {
  home: '/',
  releases: '/releases',
  login: '/login',
  profile: '/profile',
  registration: '/registration',
  release: <T, E>(id: T, slug: E) => `/release/${id}/${slug}`,
}
