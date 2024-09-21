export const routes = {
  home: '/',
  releases: '/releases',
  login: '/login',
  registration: '/registration',
  release: <T, E>(id: T, slug: E) => `/release/${id}/${slug}`,
}
