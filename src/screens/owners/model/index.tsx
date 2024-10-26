import type { RightholderAppeal } from '@/shared/api/model'
import { createRightholderAppeal } from '@/shared/api/support/support'
import { ErrorMessages } from '@/shared/types'
import { useState } from 'react'

export const useOwners = () => {
  const [errors, setErrors] = useState<ErrorMessages[]>([])

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

  const onSubmit = (data: RightholderAppeal) => {
    createRightholderAppeal(data)
      .then(() => {
        alert('Дякуємо за ваше звернення')
      })
      .catch(() => {
        alert('Сталася помилка під час відправки форми')
      })
  }
  return { onSubmit, getFieldError, clearError }
}
