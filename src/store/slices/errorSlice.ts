import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  errors: { fieldId: string; message: string; timestamp: number }[];
}

const initialState: ErrorState = {
  errors: [],
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{ fieldId: string; message: string }>
    ) => {
      state.errors = state.errors.filter(
        (error) => error.fieldId !== action.payload.fieldId
      );
      state.errors.push({
        fieldId: action.payload.fieldId,
        message: action.payload.message,
        timestamp: Date.now(),
      });
    },
    clearError: (state, action: PayloadAction<string>) => {
      state.errors = state.errors.filter(
        (error) => error.fieldId !== action.payload
      );
    },
    clearAllErrors: (state) => {
      state.errors = [];
    },
  },
});

export const { setError, clearError, clearAllErrors } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
export default errorSlice.reducer;
