import { useState } from 'react'
import { TokenObtainPair } from '@/shared/api/model'
import { signIn } from 'next-auth/react'

interface ErrorMessages {
  location: string
  message: string
}

export const useLogin = () => {
  const [errors, setErrors] = useState<ErrorMessages[]>([])

  const login = async ({ password, username }: TokenObtainPair) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        password,
        username,
      })
      console.log(res)
    } catch {}
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
