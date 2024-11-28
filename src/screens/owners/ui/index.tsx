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
import { useOwners } from '@/screens/owners/model'

const appealSchema = yup.object({
  organization: yup.string().required('Псевдонім не може бути пустим полем'),
  contact_person: yup.string().required('Псевдонім не може бути пустим полем'),
  email: yup
    .string()
    .email('Невірний формат електронної пошти')
    .required('E-mail є обов’язковим полем'),
  release_url: yup
    .string()
    .url('Невірний формат URL')
    .required('Це поле є обов’язковим'),
  document_url: yup
    .string()
    .url('Невірний формат URL')
    .required('Це поле є обов’язковим'),
  explanation: yup.string().required('Псевдонім не може бути пустим полем'),
  message: yup
    .string()
    .required('Псевдонім не може бути пустим полем')
    .min(10, 'Повідомлення має бути щонайменше 10 символів'),
})

export const OwnersPage = () => {
  const { onSubmit, clearError, getFieldError } = useOwners()

  return (
    <PageLayout>
      <Formik
        initialValues={{
          organization: '',
          contact_person: '',
          email: '',
          release_url: '',
          document_url: '',
          explanation: '',
          message: '',
        }}
        validationSchema={appealSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form className="w-full">
            <Card className="w-full" variant="ghost">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  Правовласникам
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Input
                  className="bg-muted"
                  label="Назва організації"
                  name="organization"
                  placeholder="Введіть назву організації"
                  value={values.organization}
                  onChange={(e) => {
                    handleChange(e)
                    clearError('organization')
                  }}
                  onBlur={handleBlur}
                  error={getFieldError(
                    touched.organization,
                    errors.organization,
                    'organization',
                  )}
                />
                <Input
                  className="bg-muted"
                  label="Контактне лице"
                  name="contact_person"
                  placeholder="Введіть контактну особу"
                  value={values.contact_person}
                  onChange={(e) => {
                    handleChange(e)
                    clearError('contact_person')
                  }}
                  onBlur={handleBlur}
                  error={getFieldError(
                    touched.contact_person,
                    errors.contact_person,
                    'contact_person',
                  )}
                />
                <Input
                  label="E-mail"
                  className="bg-muted"
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
                  className="bg-muted"
                  label="Прямі посилання на сторінки ресурсу, інформація з яких потребує видалення"
                  name="release_url"
                  placeholder="Введіть URL сторінки"
                  value={values.release_url}
                  onChange={(e) => {
                    handleChange(e)
                    clearError('release_url')
                  }}
                  onBlur={handleBlur}
                  error={getFieldError(
                    touched.release_url,
                    errors.release_url,
                    'release_url',
                  )}
                />
                <Textarea
                  className="bg-muted"
                  label="Посилання на документ, який є доказом наявності у Вас прав на матеріал, розміщений на сайті"
                  name="document_url"
                  placeholder="Введіть URL документа"
                  value={values.document_url}
                  onChange={(e) => {
                    handleChange(e)
                    clearError('document_url')
                  }}
                  onBlur={handleBlur}
                  error={getFieldError(
                    touched.document_url,
                    errors.document_url,
                    'document_url',
                  )}
                />
                <Textarea
                  className="bg-muted"
                  label="Текст-пояснення, який ви хотіли залишити в оголошенні факту видалення публікації"
                  name="explanation"
                  placeholder="Введіть текст пояснення"
                  value={values.explanation}
                  onChange={(e) => {
                    handleChange(e)
                    clearError('explanation')
                  }}
                  onBlur={handleBlur}
                  error={getFieldError(
                    touched.explanation,
                    errors.explanation,
                    'explanation',
                  )}
                />
                <Textarea
                  className="bg-muted"
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
