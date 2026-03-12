import { createFileRoute } from '@tanstack/react-router'
import { insuranceQuoteSchema } from '#/schemas/insuranceSchema'
import DynamicForm from '#/components/DynamicForm'

export const Route = createFileRoute('/insuranceForm')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Insurance Form</h1>
      <DynamicForm schema={insuranceQuoteSchema} />
    </div>
  )
}
