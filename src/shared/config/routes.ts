export const routes = {
  home: '/',
  releases: '/releases',
  login: '/login',
  registration: '/registration',
  release: <T>(id: T, slug: T) => `/release/${id}/${slug}`,
}
