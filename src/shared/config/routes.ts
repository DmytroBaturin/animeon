export const routes = {
  home: '/',
  releases: '/releases',
  login: '/login',
  registration: '/registration',
  release: (id: string, slug: string) => `/release/${id}/${slug}`,
}
