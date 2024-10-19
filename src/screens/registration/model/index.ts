import { userRegister } from '@/shared/api/auth/auth'
import { type RequestUserRegister } from '@/shared/api/model'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ErrorMessages {
  location: string
  message: string
}

export const useRegistration = () => {
  const [errors, setErrors] = useState<ErrorMessages[]>([])
  const router = useRouter()

  const registration = async ({
    password,
    username,
    password_repeat,
    email,
  }: RequestUserRegister) => {
    try {
      const res = await userRegister(
        { password, username, password_repeat, email },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (res.status === 400 && (res as any).data?.errors) {
        setErrors((res as any).data.errors)
      } else {
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

  return { registration, errors, clearError, getFieldError }
}
