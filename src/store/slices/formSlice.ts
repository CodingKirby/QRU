import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomField {
  id: string;
  label: string;
  value: string;
  type?: "custom";
}

export interface FormField {
  required?: boolean;
  id: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "select" | "date" | "custom";
  placeholder?: string;
  options?: { label: string; value: string }[];
  value?: string;
  subFields?: FormField[];
  disabled?: [boolean, boolean];
}

export interface FormState {
  customFields: CustomField[];
  formData: Record<string, string>;
  isPublic: Record<string, boolean>;
}

const initialState: FormState = {
  customFields: [],
  formData: {},
  isPublic: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      state.formData[action.payload.id] = action.payload.value;
    },
    setIsPublic: (
      state,
      action: PayloadAction<{ id: string; value: boolean }>
    ) => {
      state.isPublic[action.payload.id] = action.payload.value;
    },
    addCustomField: (state) => {
      if (state.customFields.length < 5) {
        state.customFields.push({
          id: `custom_${Date.now()}`,
          label: "",
          value: "",
        });
      }
    },
    removeCustomField: (state, action: PayloadAction<string>) => {
      state.customFields = state.customFields.filter(
        (field) => field.id !== action.payload
      );
    },
    resetForm: (state) => {
      state.customFields = [];
      state.formData = {};
      state.isPublic = {};
    },
  },
});

export const {
  setFormData,
  setIsPublic,
  addCustomField,
  removeCustomField,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
