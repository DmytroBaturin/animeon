import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isObjectEmpty = (objectName) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  )
}
