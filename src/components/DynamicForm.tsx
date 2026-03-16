import type { FormSchema, LayoutNode, FieldDefinition } from "../types";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Select, TextInput, Textarea, NumberInput, Radio, Switch, Button } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';

interface DynamicFormProps {
  schema: FormSchema;
}

const spacingMap: Record<string, string> = {
  sm: "8px",
  md: "16px",
  lg: "32px",
};

const DynamicForm = ({ schema }: DynamicFormProps) => {
  const [formKey, setFormKey] = useState(0); // for resetting the form
  const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm();

  const values = watch();

  // Conditional Visibility
  const isFieldVisible = (field: FieldDefinition) => {
    if (!field.visibleWhen) return true;

    // Array of visibility conditions
    if (Array.isArray(field.visibleWhen)) {
      return field.visibleWhen.every((condition) => {
        const currentValue = values[condition.field];
        
        if (condition.op === "in") {
          return condition.value.includes(currentValue);
        }
        return currentValue === condition.value;
      });
    }

    // Single visibility condition
    const { field: watchedField, op, value } = field.visibleWhen;
    const currentValue = values[watchedField];

    if (op === "equals") {
      return currentValue === value;
    }

    if (op === "in") {
      return value.includes(currentValue);
    }

    return true;
  };

  // Field Renderer
  const renderField = (field: FieldDefinition) => {
    const errorMessage = errors[field.id]?.message
      ? String(errors[field.id]?.message)
      : undefined;

    switch (field.renderer) {
      case "text":
        return (
          <TextInput
            label={field.label}
            type={field.inputType || "text"}
            placeholder={field.placeholder}
            {...register(field.id, field.rules)}
            error={errorMessage}
          />
        );

      case "textarea":
        return (
          <Textarea
            label={field.label}
            placeholder={field.placeholder}
            minRows={field.props?.minRows}
            {...register(field.id, field.rules)}
            error={errorMessage}
          />
        );

      case "select":
        return (
          <Controller
            name={field.id}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => (
              <Select
                label={field.label}
                placeholder={field.placeholder}
                data={field.props?.data}
                {...controllerField}
                error={errorMessage}
              />
            )}
          />
        );

      case "radio":
        return (
          <Controller
            name={field.id}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => (
              <Radio.Group
                label={field.label}
                {...controllerField}
                error={errorMessage}
              >
                {field.props?.options?.map((option: any) => (
                  <Radio
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Radio.Group>
            )}
          />
        );

      case "switch":
        return (
          <Controller
            name={field.id}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => (
              <Switch
                label={field.label}
                {...controllerField}
                error={errorMessage}
              />
            )}
          />
        );

      case "number":
        return (
          <Controller
            name={field.id}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => (
              <NumberInput
                label={field.label}
                placeholder={field.placeholder}
                min={field.props?.min}
                max={field.props?.max}
                step={field.props?.step}
                {...controllerField}
                error={errorMessage}
              />
            )}
          />
        );

        case "checkbox":
        return (
          <Controller
            name={field.id}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => (
              <Switch
                label={field.label}
                {...controllerField}
                error={errorMessage}
              />
            )}
          />
        );

        case "date":
        return (
          <Controller
            name={field.id}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => (
              <DatePicker
                label={field.label}
                placeholder={field.placeholder}
                {...controllerField}
                error={errorMessage}
              />  
            )}
        )

      default:
        return (
          <TextInput
            placeholder={field.placeholder}
            {...register(field.id, field.rules)}
            error={errorMessage}
          />
        );
    }
  };

  // Layout Renderer
  const renderLayout = (nodes: LayoutNode[]) => {
    return nodes.map((node, index) => {
      switch (node.kind) {
        case "stack":
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacingMap[node.spacing || "md"],
              }}
            >
              {renderLayout(node.children || [])}
            </div>
          );

        case "field": {
          const field = schema.fields[node.fieldId];
          if (!field) return null;

          if (!isFieldVisible(field)) return null;

          return (
            <div
              key={field.id}
              style={
                node.colSpan ? { gridColumn: `span ${node.colSpan}` } : undefined
              }
            >
              {renderField(field)}
            </div>
          );
        }

        case "section":
          if (node.visibleWhen && !isFieldVisible({ visibleWhen: node.visibleWhen } as FieldDefinition)) {
            return null;
          }
          return (
            <div key={index}>
              {node.title && <h3>{node.title}</h3>}
              {node.withDivider && <hr />}
              {renderLayout(node.children || [])}
            </div>
          );

        case "grid":
          return (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${node.cols}, 1fr)`,
                gap: spacingMap[node.spacing || "md"] || "16px",
              }}
            >
              {renderLayout(node.children || [])}
            </div>
          );

        default:
          return null;
      }
    });
  };
 

  // Submit Handler
  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    notifications.show({
      title: 'Success',
      message: 'Form submitted successfully!',
      color: 'green',
      position: 'bottom-right',
      withCloseButton: true,
      autoClose: 2000,

    });
    // Reset form 
    reset();
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