import { createFileRoute } from '@tanstack/react-router'
import { agentUpdateSchema } from '#/schemas/agentUpdateSchema'
import DynamicForm from '#/components/DynamicForm'
import { Container, Title } from '@mantine/core'

export const Route = createFileRoute('/agent')({
  component: AgentFormPage,
})

function AgentFormPage() {
  return (
  <Container size="md" py="xs">
    <Title order={3} ta="center"> Agent Update Form</Title>
    <DynamicForm schema={agentUpdateSchema} />
  </Container>
  )
}