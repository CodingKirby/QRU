import { useState } from "react";
import { validateFieldValue, validateAllFields } from "../utils/validationUtil";
import { initialCardFormData } from "../config/formConfig";

export const useValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (fieldKey: string, value: string): string | null => {
    const error = validateFieldValue(fieldKey, value, initialCardFormData);
    setErrors((prev) => ({ ...prev, [fieldKey]: error || "" }));
    return error;
  };

  const validateAll = (formData: typeof initialCardFormData): boolean => {
    const validationErrors = validateAllFields(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const clearError = (fieldKey: string) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[fieldKey];
      return updatedErrors;
    });
  };

  return {
    errors,
    validateField,
    validateAll,
    clearError,
  };
};
