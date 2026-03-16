import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import  Header from '#/components/Header'
import { Container } from '@mantine/core'
import '../styles.css',

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  
  return (
    <>
    <Header/>
    <Container size="xl" pb="md">
      <Outlet />
      </Container>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
