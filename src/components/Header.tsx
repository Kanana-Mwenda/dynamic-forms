import {Container,Group, Title, Select} from '@mantine/core'
import {useNavigate, useLocation} from '@tanstack/react-router'

export default function Header() {

  const navigate = useNavigate()
  const location = useLocation()


  return (
    <Container h="48px" fluid={true} py="xs" size="md" bg="blue" c="white">
       <Group justify="space-between" gap="md" wrap="nowrap">

          <Select
              value={location.pathname}
              data = {[
                { value: '/', label: 'Home' },
                { value: '/contacts', label: 'Contacts' },
                { value: '/insurance', label: 'Insurance'}
              ]}
              onChange={(value) => {
                if (value) navigate({to: value})
              }}
          />

          <Title order={3}>Dynamic Forms</Title>       
          
       </Group>
    </Container>
  )
  }
     

