import type { FormSchema, LayoutNode, FieldDefinition } from "../types";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Select, TextInput, Textarea, NumberInput, Radio, Switch, Button } from "@mantine/core";
import { notifications } from '@mantine/notifications';

interface DynamicFormProps {
  schema: FormSchema;
}

const spacingMap: Record<string, string> = {
  sm: "8px",
  md: "16px",
  lg: "32px",
};

const DynamicForm = ({ schema }: DynamicFormProps) => {
  const [formKey, setFormKey] = useState(0);
  const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm();  // Added reset

  const values = watch();

  // ... all your existing isFieldVisible, renderField, renderLayout functions unchanged ...

  // Submit Handler - FIXED
  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    notifications.show({
      title: 'Success',
      message: 'Form submitted successfully!',
      color: 'green',
      position: 'top-right',   // FIXED: Top viewport
      top: 80,                 // Above header/devtools  
      autoClose: 4000,
      zIndex: 9999,
    });
    reset();  // FIXED: Clear all fields
    setFormKey(prev => prev + 1);
  };

  return (
    <form key={formKey} onSubmit={handleSubmit(onSubmit)}>
      {renderLayout(schema.layout || [])}
      <Button type="submit" variant="filled" color="blue">
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;
