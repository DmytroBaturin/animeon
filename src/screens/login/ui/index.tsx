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
import { PageLayout } from '@/shared/layouts/page'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'
import { useLogin } from '@/screens/login/model'
import { TokenObtainPair } from '@/shared/api/model'
import * as React from 'react'
import { CenteringLayout } from '@/shared/layouts/center'

export const LoginPage = () => {
  const { login, clearError, getFieldError, errors: errorsServer } = useLogin()
  const loginSchema = yup.object().shape({
    username: yup.string().required("Це обов'язкове поле"),
    password: yup.string().required("Це обов'язкове поле"),
  })

  console.log(errorsServer)

  return (
    <PageLayout>
      <CenteringLayout>
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
            <Form className="lg:w-[20%] w-full p-2">
              <Card
                className="w-full bg-muted/40 border border-white/[15%] shadow-2xl"
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
                    Ще не маєте профілю на нашому сайті?
                    <span className="font-bold text-[#00CF05]">
                      <Link href={routes.registration}> Реєстрація</Link>
                    </span>
                  </CardDescription>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </CenteringLayout>
    </PageLayout>
  )
}
