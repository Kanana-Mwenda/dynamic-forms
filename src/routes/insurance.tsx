import { createFileRoute } from '@tanstack/react-router'
import { insuranceQuoteSchema } from '#/schemas/insuranceSchema'
import DynamicForm from '#/components/DynamicForm'
import { Container, Title } from '@mantine/core'

export const Route = createFileRoute('/insurance')({
  component: InsurancePage,
})

function InsurancePage() {
  return ( 
    <Container size="md" py="xs">
      <Title order={3} ta="center" mb="sm" c="#694a7b">Insurance Form</Title>
      <DynamicForm schema={insuranceQuoteSchema} />
    </Container>
  )
}
