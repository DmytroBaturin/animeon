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
import type { RequestUserRegister } from '@/shared/api/model'
import { useRegistration } from '@/screens/registration/model'

const registrationSchema = yup.object().shape({
  username: yup.string().required("Це обов'язкове поле"),
  email: yup
    .string()
    .email('Не вірний формат мейлу')
    .required("Це обов'язкове поле"),
  password: yup.string().required("Це обов'язкове поле"),
  password_repeat: yup
    .string()
    .required("Це обов'язкове поле")
    .oneOf([yup.ref('password')], 'Паролі не співпадають'),
})

export const RegistrationPage = ({
  togglePage,
}: {
  togglePage: () => void
}) => {
  const {
    errors: _serverErrors,
    registration,
    clearError,
    getFieldError,
  } = useRegistration()

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        password_repeat: '',
      }}
      validationSchema={registrationSchema}
      onSubmit={(values: RequestUserRegister) => {
        registration(values)
      }}
    >
      {({ errors, touched, handleChange, handleBlur, values }) => (
        <Form>
          <Card
            className="w-full bg-muted/90 border border-white/[15%] shadow-2xl"
            variant="ghost"
          >
            <CardHeader>
              <CardTitle className="text-3xl">Реєстрація</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Input
                label="Псевдонім"
                placeholder="Введіть свій псевдонім"
                name="username"
                value={values.username}
                onChange={(e) => {
                  clearError('username')
                  handleChange(e)
                }}
                onBlur={handleBlur}
                error={getFieldError(
                  touched.username,
                  errors.username,
                  'username',
                )}
              />

              <Input
                label="Емейл"
                name="email"
                placeholder="Введіть свій емейл"
                value={values.email || ''}
                onChange={(e) => {
                  clearError('email')
                  handleChange(e)
                }}
                onBlur={handleBlur}
                error={getFieldError(touched.email, errors.email, 'email')}
              />
              <Input
                label="Пароль"
                name="password"
                type="password"
                placeholder="Введіть свій пароль"
                value={values.password}
                onChange={(e) => {
                  clearError('password')
                  handleChange(e)
                }}
                onBlur={handleBlur}
                error={getFieldError(
                  touched.password,
                  errors.password,
                  'password',
                )}
              />
              <Input
                label="Підтвердіть пароль"
                name="password_repeat"
                value={values.password_repeat}
                onChange={(e) => {
                  clearError('password_repeat')
                  handleChange(e)
                }}
                onBlur={handleBlur}
                placeholder="Введіть свій пароль ще раз"
                error={getFieldError(
                  touched.password_repeat,
                  errors.password_repeat,
                  'password_repeat',
                )}
              />
            </CardContent>
            <CardFooter className="flex gap-2 items-center justify-center flex-col">
              <Button type="submit" className="w-full">
                Увійти
              </Button>
              <CardDescription className="w-full">
                Вже маєте профіль на нашому сайті? {'  '}
                <span
                  onClick={togglePage}
                  className="font-bold cursor-pointer text-[#00CF05]"
                >
                  Увійти
                </span>
              </CardDescription>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  )
}
