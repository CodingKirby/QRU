import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICustomField } from "../../types/formType";

export interface FormState {
  customFields: ICustomField[];
  formData: Record<string, string>;
  isPublic: Record<string, boolean>;
}

const initialState: FormState = {
  customFields: [],
  formData: {},
  isPublic: {
    bio: true,
    name: true,
    gender: true,
  },
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
    resetForm: () => {
      return initialState;
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
