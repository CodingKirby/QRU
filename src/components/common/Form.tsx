import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, clearError } from "../../store/slices/errorSlice";
import { setFormData, setIsPublic } from "../../store/slices/formSlice";
import { IFormField, IFormSubmit } from "../../types/formType";
import { validateFields } from "../../utils/validationUtil";

import styled from "styled-components";
import InputText from "./InputText";
import InputSelect from "./InputSelect";
import InputCheck from "./InputCheck";
import Button from "./Button";
import InputDate from "./InputDate";
import { FaTrash } from "react-icons/fa";
import { RootState } from "../../store";

interface Props {
  fields: IFormField[];
  onSubmit: (data: IFormSubmit) => void;
  onCustomFieldRemove?: (id: string) => void;
}

const Form: React.FC<Props> = ({ fields, onSubmit, onCustomFieldRemove }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  const isPublic = useSelector((state: RootState) => state.form.isPublic);

  // 필드 변경 핸들러
  const handleFieldChange = (id: string, value: string) => {
    dispatch(setFormData({ id, value: value || "" }));
    if (value.trim() !== "") {
      dispatch(clearError(id));
    }
  };

  // 필드 포커스 해제 시 검증
  const handleBlur = (id: string) => {
    const field = fields.find((field) => field.id === id);
    if (field?.required && !formData[id]?.trim()) {
      dispatch(
        setError({
          fieldId: id,
          message: `"${field.label}" 란은 필수 입력 사항입니다.`,
        })
      );
    }
  };

  // 생년월일에 따라 나이 계산
  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // 날짜 변경 핸들러
  const handleDateChange = (id: string, date: Date | null) => {
    if (!date) {
      dispatch(setFormData({ id, value: "" }));
      return;
    }

    const value = date.toLocaleDateString();
    dispatch(setFormData({ id, value }));

    if (id === "birth") {
      const age = calculateAge(date);
      dispatch(
        setFormData({
          id: "birth_birthday",
          value: date.toLocaleDateString("ko-KR", {
            month: "long", // "1월", "2월"처럼 표시
            day: "numeric", // "1일", "2일"처럼 표시
          }),
        })
      );
      dispatch(setFormData({ id: "birth_age", value: age.toString() }));
    }
  };

  // 체크박스 토글 핸들러
  const handleCheckboxToggle = (id: string, checked: boolean) => {
    dispatch(setIsPublic({ id, value: checked }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateFields(fields, formData, isPublic);

    if (!isValid) {
      errors.forEach((error) => dispatch(setError(error)));
      return;
    }

    onSubmit({ values: formData, isPublic: isPublic });
  };

  // 필드 렌더링
  const renderField = (field: IFormField) => {
    const { id, type, label, options, placeholder, required, subFields } =
      field;

    return (
      <div
        className={`form-group ${type === "custom" ? "custom" : ""}`}
        key={id}
      >
        <div className="form-field">
          <label className="field-label" htmlFor={id}>
            {label}
            {required && <span className="required">*</span>}
          </label>
          {!subFields && (
            <InputCheck
              name={id}
              label={`공개`}
              onChange={(name, checked) => handleCheckboxToggle(name, checked)}
              checked={isPublic[id] ?? false}
              disabled={field.disabled?.[0] ?? false}
            />
          )}
          <div className="form-buttons">
            {type === "custom" && onCustomFieldRemove && (
              <Button size="extraSmall" onClick={() => onCustomFieldRemove(id)}>
                <FaTrash />
              </Button>
            )}
          </div>
        </div>

        {/* Input 타입별 렌더링 */}
        {type === "select" && options ? (
          <>
            <InputSelect
              name={id}
              value={formData[id] ?? ""}
              options={options}
              onChange={(value) => handleFieldChange(id, value)}
              placeholder={placeholder}
              onBlur={() => handleBlur(id)}
            />
            {formData[id] === "self" && (
              <InputText
                placeholder={`${label} 입력`}
                value={formData[`${id}_self`] || ""}
                onChange={(e) =>
                  handleFieldChange(`${id}_self`, e.target.value)
                }
                onBlur={() => handleBlur(`${id}_self`)}
              />
            )}
          </>
        ) : type === "date" ? (
          <InputDate
            onChange={(date) => handleDateChange(id, date)}
            onBlur={() => handleBlur(id)}
          />
        ) : type === "custom" ? (
          <>
            <InputSelect
              name={id}
              value={formData[id] || ""}
              options={options || []}
              onChange={(value) => handleFieldChange(id, value)}
              placeholder={placeholder}
              onBlur={() => handleBlur(id)}
            />
            {formData[id] === "self" && (
              <InputText
                placeholder={`${label} 제목 입력`}
                value={formData[`${id}_self`] || ""}
                onChange={(e) =>
                  handleFieldChange(`${id}_self`, e.target.value)
                }
                onBlur={() => handleBlur(`${id}_self`)}
              />
            )}
            <InputText
              placeholder={`${label} 내용 입력`}
              value={formData[`${id}_value`] || ""}
              onChange={(e) => handleFieldChange(`${id}_value`, e.target.value)}
              onBlur={() => handleBlur(id)}
            />
          </>
        ) : (
          <InputText
            name={id}
            placeholder={placeholder}
            value={formData[id] || ""}
            onChange={(e) => handleFieldChange(id, e.target.value)}
            disabled={field.disabled?.[1] ?? false}
            onBlur={() => handleBlur(id)}
          />
        )}

        {/* SubField 렌더링 */}
        {subFields &&
          subFields.map((subField) =>
            renderField({
              ...subField,
              id: `${id}_${subField.id}`,
            })
          )}
      </div>
    );
  };

  return (
    <StyledForm id="form" onSubmit={handleSubmit}>
      {fields.map(renderField)}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &.custom {
      background: ${({ theme }) => theme.color.blur};
      padding: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      box-shadow: ${({ theme }) => theme.shadow.default};
    }

    .form-field {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: end;
      gap: 0.5rem;
      padding-left: 1rem;

      .form-buttons {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
      }
    }

    .field-label {
      font-weight: bold;
    }

    .required {
      color: ${({ theme }) => theme.color.primary};
      margin-left: 0.25rem;
    }

    .error-message {
      color: red;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  }
`;

export default Form;
