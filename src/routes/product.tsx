import { createFileRoute } from '@tanstack/react-router'
import { productFormSchema } from '#/schemas/productFormSchema'
import DynamicForm from '#/components/DynamicForm'
import { Container, Title } from '@mantine/core'

export const Route = createFileRoute('/product')({
  component: ProductFormPage,
})

function ProductFormPage() {
  return (
  <Container size="md" py="xs">
    <Title order={3} ta="center" c="#694a7b"> Product Form</Title>
    <DynamicForm schema={productFormSchema} />
  </Container>
  )
}