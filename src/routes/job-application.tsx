import { createFileRoute } from '@tanstack/react-router'
import { jobApplicationSchema } from '#/schemas/jobApplicationSchema'
import DynamicForm from '#/components/DynamicForm'
import { Container, Title } from '@mantine/core'

export const Route = createFileRoute('/job-application')({
  component: JobApplicationPage,
})

function JobApplicationPage() {
  return (
  <Container size="md" py="xs">
    <Title order={3} ta="center" c="#694a7b"> Job Application Form</Title>
    <DynamicForm schema={jobApplicationSchema} />
  </Container>
  )
}