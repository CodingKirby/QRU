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
  value?: string;
  required?: boolean;
  placeholder?: string;
  options?: IOption[];
  subFields?: IFormField[];
  disabled?: [labelDisabled: boolean, inputDisabled: boolean];
  minLength?: number;
  maxLength?: number;
}

export interface ICustomField {
  id: string;
  label: string;
  value: string;
  type?: "custom";
}

export interface IFormSubmit {
  values: Record<string, string>;
  isPublic: Record<string, boolean>;
}
