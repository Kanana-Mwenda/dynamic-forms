import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import {MantineProvider} from '@mantine/core'
import {Notifications} from '@mantine/notifications'
import { DatesProvider }  from '@mantine/dates';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';


const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
  <MantineProvider
      >
      <DatesProvider
      settings={{
        locale: 'en-GB',
        firstDayOfWeek: 0,
        weekendDays: [0, 6]
      }}>
       <RouterProvider router={router} />
       <Notifications />
      </DatesProvider>
    </MantineProvider>
)
}
