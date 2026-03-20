import type { FormSchema, LayoutNode, FieldDefinition } from "../types";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Select, TextInput, Textarea, NumberInput, Radio, Switch, Button, MultiSelect, FileInput, PasswordInput } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { DatePickerInput } from '@mantine/dates';

interface DynamicFormProps {
  schema: FormSchema;
}

const spacingMap: Record<string, string> = {
  sm: "8px",
  md: "16px",
  lg: "32px",
};

const DynamicForm = ({ schema }: DynamicFormProps) => {

 const formStorageKey = `${schema.id}_draft`;
 const [shouldSaveDraft, setShouldSaveDraft] = useState(true);
 const [isSubmitted, setIsSubmitted] = useState(false);

 const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm();

 const values = watch();

  //load draft
  useEffect(() => {
    setIsSubmitted(false);
    const savedData = localStorage.getItem(formStorageKey);
    if (savedData){
      reset(JSON.parse(savedData));
    }
  }, [formStorageKey, reset]);

 
  //save draft
   useEffect(() => {
    if (!shouldSaveDraft || isSubmitted) return;

    if (!values || Object.keys(values).length === 0) return;

    localStorage.setItem(formStorageKey, JSON.stringify(values));
  }, [values, formStorageKey, shouldSaveDraft]);

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
    const errorMessage = errors[field.id]?.message as string | undefined;

    switch (field.renderer) {
      case "text":
        if (field.inputType === "password"){
          return (
            <PasswordInput
              label={field.label}
              {...register(field.id, field.rules)}
              error={errorMessage}
            />
          )
        }

        return (
          <TextInput
            label={field.label}
            type= "text"
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
                  <Radio color="#694a7b"
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
              <Switch color="694a7b"
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
                {...field.props}
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
              <Switch color="694a7b"
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
              <DatePickerInput
                label={field.label}
                {...field.props}
                value={controllerField.value}
                onChange={controllerField.onChange}
                error={errorMessage}
              />
            )}
          />
        );

        case "multiselect":
        return (
          <Controller
            name={field.id}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => (
              <MultiSelect
                label={field.label}
                {...field.props}
                {...controllerField}
                error={errorMessage}
              />
            )}
          />
        );

        case "file":
        return (
          <Controller
            name={field.id}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => (
              <FileInput
                label={field.label}
                accept=".pdf,.doc,.docx"
                {...field.props}
                {...controllerField}
                error={errorMessage}
              />
            )}
          />
        );

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
    
    setIsSubmitted(true);
    setShouldSaveDraft(false);
    reset();
    localStorage.removeItem(formStorageKey); //remove draft
    notifications.show({
      title: 'Success',
      message: 'Form submitted successfully!',
      color: 'green',
      position: 'bottom-right',
      withCloseButton: true,
      autoClose: 2000,

    });
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderLayout(schema.layout || [])}
      <Button type="submit" variant="filled">
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;