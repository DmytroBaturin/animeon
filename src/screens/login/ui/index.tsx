'use client'

import { Form, Formik } from 'formik'
import * as yup from 'yup'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useLogin } from '@/screens/login/model'
import { TokenObtainPair } from '@/shared/api/model'
import * as React from 'react'

export const LoginPage = ({ togglePage }: { togglePage: () => void }) => {
  const { login, clearError, getFieldError, errors: errorsServer } = useLogin()
  const loginSchema = yup.object().shape({
    username: yup.string().required("Це обов'язкове поле"),
    password: yup.string().required("Це обов'язкове поле"),
  })

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (values: TokenObtainPair) => {
        login(values)
      }}
    >
      {({ errors, touched, handleChange, handleBlur, values }) => (
        <Form>
          <Card
            className="w-full bg-muted/90 border border-white/[15%] shadow-2xl"
            variant="primary"
          >
            <CardHeader>
              <CardTitle className="text-3xl">Увійти</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Input
                label="Псевдонім"
                name="username"
                placeholder="Введіть свій псевдонім"
                value={values.username}
                onChange={(e) => {
                  handleChange(e)
                  clearError('username')
                }}
                onBlur={handleBlur}
                error={getFieldError(
                  touched.username,
                  errors.username,
                  'username',
                )}
              />
              <Input
                label="Пароль"
                name="password"
                type="password"
                placeholder="Введіть свій пароль"
                value={values.password}
                onChange={(e) => {
                  handleChange(e)
                  clearError('password')
                }}
                onBlur={handleBlur}
                error={getFieldError(
                  touched.password,
                  errors.password,
                  'password',
                )}
              />
            </CardContent>

            <CardFooter className="flex gap-2 items-center justify-center flex-col">
              <Button type="submit" className="w-full">
                Увійти
              </Button>
              {errorsServer && (
                <p className="text-red-500 text-sm">
                  {errorsServer[0]?.message}
                </p>
              )}
              <CardDescription className="w-full">
                Ще не маєте профілю на нашому сайті?{'  '}
                <span
                  onClick={togglePage}
                  className="font-bold cursor-pointer text-[#00CF05]"
                >
                  Реєстрація
                </span>
              </CardDescription>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  )
}
