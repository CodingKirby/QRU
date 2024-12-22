import { Timestamp } from "firebase/firestore";

// 기본 필드 타입
type TextField = {
  value: string | number | boolean | CustomFieldValue[] | null;
  label: string;
  isPublic: boolean;
  isRequired: boolean;
  maxLength?: number;
};

// 형식 필드 타입
type FormatField = TextField & {
  format: string;
};

// 선택 필드 타입
type SelectorField = TextField & {
  options: string[];
  otherOption: string;
};

type DateField = FormatField & {
  value: Date | string | null;
  format: "YYYY-MM-DD" | "MM-DD";
};

// 사용자 정의 필드 값 타입
export type CustomFieldValue = {
  key: string;
  value: string;
  isPublic: boolean;
};

// 사용자 정의 필드 타입
export type CustomField = {
  value: CustomFieldValue[];
  maxFields: number;
  recommendedFields: {
    key: string;
    label: string;
    maxLength: number;
  }[];
  isPublic: boolean;
  label: string;
};

// 준비된 필드 타입
export interface PreparedField extends TextField {
  value: string | number | boolean | null | CustomFieldValue[];
  isRequired: boolean;
  maxLength?: number;
  options?: string[];
  format?: string;
}

// 필드 타입 구성
export type CardFormField =
  | TextField
  | FormatField
  | SelectorField
  | CustomField
  | PreparedField;

// 명함 폼 데이터 타입
export interface CardForm {
  id: string; // 문서 ID
  uid: string | null; // 사용자 ID (비회원일 경우 null)
  bio: TextField; // 한 줄 소개
  name: TextField; // 이름/닉네임
  gender: SelectorField;
  birthday: DateField;
  age: FormatField;
  birth: DateField;
  email: FormatField;
  sns: SelectorField;
  mbti: SelectorField;
  hobby: TextField;
  customFields: CustomField;
  qrCodeUrl: string; // QR 코드 URL
  createdAt: Timestamp; // 생성 날짜
  updatedAt: Timestamp | null; // 수정 날짜
}
