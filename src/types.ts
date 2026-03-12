export interface FormSchema{
    id: string;
    meta: {
        title:string;
        subtitle: string;
    };
    fields:Record<string, FieldDefinition>;
    layout: LayoutNode[];
    }

export interface FieldDefinition {
    id: string;
    label: string;
    renderer: string;
    placeholder?: string;
    inputType?: string;
    props?: any;
    rules?: ValidationRules;
    defaultValue?: any;
    visibleWhen?: VisibleWhen;
}

export type RendererType = "text" | "number" | "select" | "radio" | "switch" | "textarea" ;

export interface ValidationRules {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: {value: RegExp; message:string};
}

export type LayoutNode = StackNode | FieldNode | SectionNode | GridNode;

export interface StackNode {
    kind: "stack";
    spacing?: string;
    children: LayoutNode[];
}

export interface FieldNode {
    kind: "field";
    fieldId: string;
    colSpan?: number;
    children?: LayoutNode[];
}

export interface SectionNode {
    kind: "section";
    title?: string;
    withDivider?: boolean;
    children: LayoutNode[];
    visibleWhen?: VisibleWhen;
}
export interface GridNode {
    kind: "grid";
    cols: number;
    spacing?: string;
    children: LayoutNode[];
}

export interface VisibleWhen {
    field: string;
    op?: string;
    value?: any;
    equals?: any;
}