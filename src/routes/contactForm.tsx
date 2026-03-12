import { createFileRoute } from '@tanstack/react-router'
import { contactFormSchema } from '#/schemas/contactSchema'
import DynamicForm from '#/components/DynamicForm'


export const Route = createFileRoute('/contactForm')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div>
    <h1> Contact Form</h1>
    <DynamicForm schema={contactFormSchema} />
  </div>)
}
