import { createFileRoute } from '@tanstack/react-router'
import { registrationFormSchema } from '#/schemas/registrationSchema'
import DynamicForm from '#/components/DynamicForm'
import { Container, Title } from '@mantine/core'

export const Route = createFileRoute('/registration')({
  component: RegistrationPage,
})

function RegistrationPage() {
  return (
  <Container size="md" py="xs">
    <Title order={3} ta="center"> Registration Form</Title>
    <DynamicForm schema={registrationFormSchema} />
  </Container>
  )
}