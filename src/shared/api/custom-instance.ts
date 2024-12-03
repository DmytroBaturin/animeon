import { logout } from '@/entities/session'
import { fetchExternalImage } from 'next/dist/server/image-optimizer'
import { authTokenRefreshCreate } from '@/shared/api/auth/auth'

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
  const baseUrl = process.env.API_HOST
  return `${baseUrl}/api/v1${contextUrl}`
}

const getHeaders = (headers?: HeadersInit): HeadersInit => {
  return {
    ...headers,
  }
}

export const customInstance = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  const request = new Request(requestUrl, requestInit);
  const response = await fetch(request);
  const data = await getBody<T>(response);

  return { status: response.status, data, headers: response.headers } as T;
};

