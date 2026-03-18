import { createFileRoute } from '@tanstack/react-router'
import { contactFormSchema } from '#/schemas/contactSchema'
import DynamicForm from '#/components/DynamicForm'
import { Container, Title } from '@mantine/core'

export const Route = createFileRoute('/contacts')({
  component: ContactsPage,
})

function ContactsPage() {
  return (
  <Container size="md" py="xs">
    <Title order={3} ta="center" c="#694a7b"> Contact Form</Title>
    <DynamicForm schema={contactFormSchema} />
  </Container>
  )
}
