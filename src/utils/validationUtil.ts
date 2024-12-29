import { IFormField } from "../types/formType";

interface ValidationResult {
  isValid: boolean;
  errors: { fieldId: string; message: string }[];
}

export const validateFields = (
  fields: IFormField[],
  formData: Record<string, string>,
  isPublic: Record<string, boolean>
): ValidationResult => {
  const errors: { fieldId: string; message: string }[] = [];
  let isValid = true;

  fields.forEach((field) => {
    const value = formData[field.id]?.trim();
    const isPublicField = isPublic[field.id];

    // 필수 항목 또는 공개로 설정된 항목에 값이 없을 경우
    if (field.required && !value) {
      errors.push({
        fieldId: field.id,
        message: `"${field.label}" 란은 필수 입력 사항입니다.`,
      });
      isValid = false;
      return;
    }

    if (isPublicField && !value) {
      errors.push({
        fieldId: field.id,
        message: `공개로 설정한 "${field.label}" 란은 비울 수 없습니다.`,
      });
      isValid = false;
      return;
    }

    // 형식 검증
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push({
          fieldId: field.id,
          message: `"${field.label}"에 올바른 이메일 주소를 입력해주세요.`,
        });
        isValid = false;
      }
    }

    if (field.type === "number" && value) {
      if (isNaN(Number(value))) {
        errors.push({
          fieldId: field.id,
          message: `"${field.label}"에 숫자를 입력해주세요.`,
        });
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};