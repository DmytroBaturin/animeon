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

const registrationSchema = yup.object().shape({
  name: yup.string().required("Це обов'язкове поле"),
  email: yup
    .string()
    .email('Не вірний формат мейлу')
    .required("Це обов'язкове поле"),
  password: yup.string().required("Це обов'язкове поле"),
  passwordConfirmation: yup
    .string()
    .required("Це обов'язкове поле")
    .oneOf([yup.ref('password')], 'Паролі не співпадають'),
})

export const RegistrationPage = () => {
  return (
    <PageLayout>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
          }}
          validationSchema={registrationSchema}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form className="lg:w-[20%] w-full">
              <Card
                className="w-full bg-muted/40  border border-white/[15%] shadow-2xl"
                variant="ghost"
              >
                <CardHeader>
                  <CardTitle className="text-3xl">Реєстрація</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Input
                    label="Псевдонім"
                    placeholder="Введіть свій псевдонім"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.name && errors.name ? errors.name : undefined
                    }
                  />

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
                  <Input
                    label="Підтвердіть пароль"
                    name="passwordConfirmation"
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Введіть свій пароль ще раз"
                    error={
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation
                        ? errors.passwordConfirmation
                        : undefined
                    }
                  />
                </CardContent>
                <CardFooter className="flex gap-2 items-center justify-center flex-col">
                  <Button type="submit" className="w-full">
                    Увійти
                  </Button>
                  <CardDescription className="w-full">
                    Вже маєте профіль на нашому сайті?
                    <span className="font-bold text-[#00CF05]">
                      <Link href={routes.login}> Увійти</Link>
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
