import { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)
  const originalRequest = new Request(req.url, {
    method: req.method,
    headers: requestHeaders,
    body: req.body,
    redirect: 'manual',
  })

  console.log(originalRequest.url)
}
