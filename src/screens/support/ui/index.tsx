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
import { Textarea } from '@/shared/components/ui/textarea'
import { useSupport } from '@/screens/support/model'

const appealSchema = yup.object({
  title: yup.string().required('Тема не може бути пустим полем'),
  email: yup
    .string()
    .email('Невірний формат електронної пошти')
    .required('E-mail є обов’язковим полем'),
  message: yup
    .string()
    .required('Повідомлення не може бути пустим полем')
    .min(10, 'Повідомлення має бути щонайменше 10 символів'),
})

export const SupportPage = () => {
  const { onSubmit, clearError, getFieldError } = useSupport()

  return (
    <PageLayout>
      <Formik
        initialValues={{
          title: '',
          email: '',
          message: '',
        }}
        validationSchema={appealSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form className="w-full">
            <Card className="w-full" variant="ghost">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Допомога</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Input
                  label="Тема"
                  name="title"
                  placeholder="Введіть назву організації"
                  value={values.title}
                  onChange={(e) => {
                    handleChange(e)
                    clearError('organization')
                  }}
                  onBlur={handleBlur}
                  error={getFieldError(
                    touched.title,
                    errors.title,
                    'organization',
                  )}
                />
                <Input
                  label="E-mail"
                  name="email"
                  placeholder="Введіть e-mail"
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e)
                    clearError('email')
                  }}
                  onBlur={handleBlur}
                  error={getFieldError(touched.email, errors.email, 'email')}
                />
                <Textarea
                  label="Повідомлення"
                  name="message"
                  placeholder="Введіть повідомлення"
                  value={values.message}
                  onChange={(e) => {
                    handleChange(e)
                    clearError('message')
                  }}
                  onBlur={handleBlur}
                  error={getFieldError(
                    touched.message,
                    errors.message,
                    'message',
                  )}
                />
              </CardContent>
              <CardFooter className="flex gap-2 items-center justify-center flex-col">
                <Button type="submit" className="w-full">
                  Надіслати
                </Button>
                <CardDescription className="text-center">
                  Якщо у вас виникли питання, зверніться до служби підтримки.
                </CardDescription>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </PageLayout>
  )
}
