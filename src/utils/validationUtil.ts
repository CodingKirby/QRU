import {
  CustomFieldValue,
  CardForm as CardFormT,
} from "../models/cardForm.model";

// 개별 필드 유효성 검사 함수
export const validateFieldValue = (
  fieldKey: string,
  value: string | CustomFieldValue[],
  formData: CardFormT
): string | null => {
  const field = formData[fieldKey as keyof CardFormT];

  if (!field) return null;

  // 필수 입력 항목 또는 공개 항목의 값 검증
  if (
    typeof field === "object" &&
    (("isRequired" in field && field.isRequired) ||
      ("isPublic" in field && field.isPublic)) &&
    (!value || (Array.isArray(value) && value.length === 0))
  ) {
    return `"${field.label}"은(는) 필수 입력 항목입니다.`;
  }

  // 최대 길이 검사
  if (
    typeof field === "object" &&
    "maxLength" in field &&
    typeof value === "string" &&
    value.length > field.maxLength!
  ) {
    return `"${field.label}"은(는) 최대 ${field.maxLength}자까지 입력할 수 있습니다.`;
  }

  // 형식 검사
  if (typeof field === "object" && "format" in field && field.format) {
    if (field.format === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value as string)) {
        return "유효한 이메일 주소를 입력해주세요.";
      }
    }
    if (field.format === "number") {
      const numberRegex = /^[0-9]*$/;
      if (!numberRegex.test(value as string)) {
        return "숫자만 입력해주세요.";
      }
    }
  }

  return null;
};

// 모든 필드 유효성 검사 함수
export const validateAllFields = (
  formData: CardFormT
): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const key in formData) {
    const field = formData[key as keyof CardFormT];
    if (field === null || typeof field !== "object" || !("value" in field)) {
      continue;
    }

    // 필수 입력 항목 또는 공개 항목 확인
    const isRequired = "isRequired" in field && field.isRequired;
    const isPublic = "isPublic" in field && field.isPublic;

    // 값 검증
    if (isRequired || isPublic) {
      const error = validateFieldValue(
        key,
        typeof field.value === "string" || Array.isArray(field.value)
          ? field.value
          : "",
        formData
      );
      if (error) {
        errors[key] = error;
      }
    }
  }

  return errors;
};
