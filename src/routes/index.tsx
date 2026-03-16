import { createFileRoute } from '@tanstack/react-router'
import { Container, Title, Text, Flex } from '@mantine/core'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return(
    <Flex align="center" justify="center" h="70vh">
    <Container size="md" py="xl">
      <Title order={2} ta="center" mb="md">Welcome to Dynamic Forms</Title>

      <Text ta="center">
        Use the dropdown in the header to choose a schema and fill out the form.
      </Text>
    </Container>
    </Flex>
  )
}
