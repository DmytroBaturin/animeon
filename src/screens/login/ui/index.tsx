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

export const LoginPage = () => {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Не вірний формат мейлу')
      .required("Це обов'язкове поле"),
    password: yup.string().required("Це обов'язкове поле"),
  })

  return (
    <PageLayout>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            console.log(values)
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
                    label="Емейл"
                    name="email"
                    placeholder="Введіть свій емейл"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.email && errors.email ? errors.email : undefined
                    }
                  />
                  <Input
                    label="Пароль"
                    name="password"
                    type="password"
                    placeholder="Введіть свій пароль"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                  />
                </CardContent>
                <CardFooter className="flex gap-2 items-center justify-center flex-col">
                  <Button type="submit" className="w-full">
                    Увійти
                  </Button>
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
      </div>
    </PageLayout>
  )
}
