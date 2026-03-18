import { createFileRoute } from '@tanstack/react-router'
import { addressFormSchema } from '#/schemas/addressFormSchema'
import DynamicForm from '#/components/DynamicForm'
import { Container, Title } from '@mantine/core'

export const Route = createFileRoute('/address')({
  component: AddressFormPage,
})

function AddressFormPage() {
  return (
  <Container size="md" py="xs">
    <Title order={3} ta="center" c="#694a7b"> Address Form</Title>
    <DynamicForm schema={addressFormSchema} />
  </Container>
  )
}