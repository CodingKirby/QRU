export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "select"
  | "date"
  | "custom";

export interface IOption {
  label: string;
  value: string;
}

export interface IFormField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  value?: string;
  options?: IOption[];
  subFields?: IFormField[];
  disabled?: [labelDisabled: boolean, inputDisabled: boolean];
}

export interface IFormSubmit {
  values: Record<string, string>;
  isPublic: Record<string, boolean>;
}
