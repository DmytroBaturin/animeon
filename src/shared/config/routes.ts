export const routes = {
  home: '/',
  releases: '/releases',
  login: '/login',
  registration: '/registration',
  release: (id: number, slug: string) => `/release/${id}/${slug}`,
}
