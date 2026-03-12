import { Link } from '@tanstack/react-router'
import {Container,Group, Title, Select} from '@mantine/core'
import {useNavigate} from '@tanstack/react-router'

export default function Header() {
  const navigate = useNavigate()

  return (
    <Container size="xl" py="md">
       <Group justify="space-between">
          <Title order={1} ta="right">Dynamic Forms</Title>

          <Select
            placeholder="Select an option"
            data={[
              {value: '/', label: 'Home'},
              {value: '/contactForm', label: 'Contact Form'},
              {value: '/insuranceForm', label: 'Insurance Form'},
            ]}
            onChange= {(value) => value && navigate({to: value})}
            />
                    
          
       </Group>
    </Container>
  )
  }
     

