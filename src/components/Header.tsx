import {Container,Group, Title, Select} from '@mantine/core'
import {useNavigate, useLocation} from '@tanstack/react-router'

export default function Header() {

  const navigate = useNavigate()
  const location = useLocation()


  return (
    <Container h="48px" fluid={true} pt="xs" pb="sm" size="md" bg="blue" c="white">
       <Group h="100%" justify="space-between" align="center" wrap="nowrap">

          <Select
              value={location.pathname}
              data = {[
                { value: '/', label: 'Home' },
                { value: '/contacts', label: 'Contacts' },
                { value: '/insurance', label: 'Insurance'},
                { value: '/job-application', label: 'Job Application'},
                { value: '/registration', label: 'Registration'},
                { value: '/product', label: 'Product'},
                { value: '/address', label: 'Address'},
                { value: '/agent', label: 'Agent'},
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
     