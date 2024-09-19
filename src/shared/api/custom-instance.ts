const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    return c.json()
  }

  if (contentType && contentType.includes('application/pdf')) {
    return c.blob() as Promise<T>
  }

  return c.text() as Promise<T>
}

const getUrl = (contextUrl: string): string => {
  if (!contextUrl) {
    throw new Error('Invalid URL: URL is empty or undefined')
  }
  const apiPrefix = '/api/v1' // Adjust this if necessary
  const fullUrl = contextUrl.startsWith('/')
    ? `${apiPrefix}${contextUrl}`
    : `${apiPrefix}/${contextUrl}`

  return fullUrl
}

const getHeaders = (headers?: HeadersInit): HeadersInit => {
  return {
    ...headers,
    Authorization: 'token',
    'Content-Type': 'multipart/form-data',
  }
}

export const customInstance = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url)
  const requestHeaders = getHeaders(options.headers)
  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  }

  const request = new Request(requestUrl, requestInit)
  const response = await fetch(request)
  const data = await getBody<T>(response)

  return { status: response.status, data } as T
}
