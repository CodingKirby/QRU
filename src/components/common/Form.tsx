import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setError, clearError } from "../../store/slices/errorSlice";
import { IFormField, IFormSubmit } from "../../types/formType";
import { validateFields } from "../../utils/validationUtil";

import styled from "styled-components";
import InputText from "./InputText";
import InputSelect from "./InputSelect";
import InputCheck from "./InputCheck";
import Button from "./Button";
import InputDate from "./InputDate";
import { FaTrash } from "react-icons/fa";

interface Props {
  fields: IFormField[];
  onSubmit: (data: IFormSubmit) => void;
  onCustomFieldRemove?: (id: string) => void;
}

const Form: React.FC<Props> = ({ fields, onSubmit, onCustomFieldRemove }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.id]: field.value || "" }),
      {}
    )
  );

  const [isPublic, setIsPublic] = useState<Record<string, boolean>>(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: field.required }), {})
  );

  const dispatch = useDispatch();

  const handleFieldChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (value.trim() !== "") {
      dispatch(clearError(id));
    }
  };

  const handleBlur = (id: string) => {
    const field = fields.find((field) => field.id === id);
    if (field?.required) {
      if (!formData[id]?.trim()) {
        dispatch(
          setError({
            fieldId: id,
            message: `"${field.label}" 란은 필수 입력 사항입니다.`,
          })
        );
      } else {
        dispatch(clearError(id));
      }
    }
  };

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

  const handleDateChange = (id: string, date: Date | null) => {
    if (id === "birth" && date) {
      const age = calculateAge(date);
      setFormData((prev) => ({
        ...prev,
        [id]: date.toISOString().split("T")[0],
        birth_birthday: date.toLocaleDateString("ko-KR"),
        birth_age: age.toString(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: date ? date.toISOString().split("T")[0] : "",
      }));
    }
  };

  const handleCheckboxToggle = (id: string, checked: boolean) => {
    setIsPublic((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateFields(fields, formData, isPublic);

    if (!isValid) {
      errors.forEach((error) => {
        dispatch(setError(error));
      });
      return;
    }

    onSubmit({ values: formData, isPublic });
  };

  const renderField = (field: IFormField) => {
    return (
      <div
        className={`form-group ${field.type === "custom" ? "custom" : ""}`}
        key={field.id}
      >
        <div className="form-field">
          <label className="field-label" htmlFor={field.id}>
            {field.label}
            {field.required && <span className="required">*</span>}
          </label>
          {!field.subFields && (
            <InputCheck
              name={field.id}
              label={`공개`}
              onChange={(name, checked) => handleCheckboxToggle(name, checked)}
              checked={isPublic[field.id]}
              disabled={field.disabled?.[0] ?? false}
            />
          )}
          <div className="form-buttons">
            {field.type === "custom" && (
              <Button
                size="extraSmall"
                onClick={() => onCustomFieldRemove?.(field.id)}
              >
                <FaTrash />
              </Button>
            )}
          </div>
        </div>
        {field.type === "select" && field.options ? (
          <>
            <InputSelect
              name={field.id}
              value={formData[field.id]}
              options={field.options}
              onChange={(value) => handleFieldChange(field.id, value)}
              placeholder={field.placeholder}
              onBlur={() => handleBlur(field.id)}
            />
            {formData[field.id] === "self" && (
              <InputText
                placeholder={`${field.label} 입력`}
                value={formData[`${field.id}_self`] || ""}
                onChange={(e) =>
                  handleFieldChange(`${field.id}_self`, e.target.value)
                }
                onBlur={() => handleBlur(`${field.id}_self`)}
              />
            )}
          </>
        ) : field.type === "date" ? (
          <InputDate
            onChange={(date) => handleDateChange(field.id, date)}
            onBlur={() => handleBlur(field.id)}
          />
        ) : field.type === "custom" ? (
          <>
            <InputText
              placeholder={"항목 이름"}
              value={formData[`${field.id}_label`] || ""}
              onChange={(e) =>
                handleFieldChange(`${field.id}_label`, e.target.value)
              }
              onBlur={() => handleBlur(field.id)}
            />
            <InputText
              placeholder={"항목 내용"}
              value={formData[`${field.id}_value`] || ""}
              onChange={(e) =>
                handleFieldChange(`${field.id}_value`, e.target.value)
              }
              onBlur={() => handleBlur(field.id)}
            />
          </>
        ) : (
          <InputText
            name={field.id}
            placeholder={field.placeholder}
            value={formData[field.id]}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            disabled={field.disabled?.[1] ?? false}
            onBlur={() => handleBlur(field.id)}
          />
        )}

        {field.subFields &&
          formData[field.id] &&
          field.subFields.map((subField) =>
            renderField({
              ...subField,
              id: `${field.id}_${subField.id}`,
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
