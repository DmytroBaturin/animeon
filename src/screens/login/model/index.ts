import { TokenObtainPair } from '@/shared/api/model'
import { useState } from 'react'
import { ErrorMessages } from '@/shared/types'
import { userLogin } from '@/shared/api/auth/auth'
import { setCookie } from '@/shared/utils'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<ErrorMessages[]>([])

  const login = async ({ password, username }: TokenObtainPair) => {
    try {
      const res = await userLogin(
        { password, username },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      if (
        res.status === 400 ||
        (res.status === 401 && (res as any).data?.errors)
      ) {
        setErrors((res as any).data.errors)
      } else {
        router.refresh()
        await setCookie('session', res.data.access)
        await setCookie('refresh', res.data.refresh)
        router.back()
      }
    } catch (error) {
      console.error('Registration failed', error)
    }
  }

  const findLocation = (location: string): string | undefined => {
    const error = errors.find((err) => err.location === location)
    return error ? error.message : undefined
  }

  const getFieldError = (
    touched: boolean | undefined,
    formikError: string | undefined,
    fieldName: string,
  ): string | undefined => {
    return touched && (formikError || findLocation(fieldName))
      ? formikError || findLocation(fieldName)
      : undefined
  }

  const clearError = (location: string) => {
    setErrors((prevErrors) =>
      prevErrors.filter((error) => error.location !== location),
    )
  }

  return { login, errors, clearError, getFieldError }
}
