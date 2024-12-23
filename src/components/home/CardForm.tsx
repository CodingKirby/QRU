import { useEffect, useRef, useState } from "react";
import { db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import InputText from "../common/InputText";
import InputCheck from "../common/InputCheck";
import { FaCircleInfo, FaPlus } from "react-icons/fa6";
import { FaPen, FaTrash } from "react-icons/fa";
import Selector from "../common/SelectBox";
import Title from "../common/Title";
import { initialCardFormData } from "../../config/formConfig";
import { useValidation } from "../../hooks/useValidation";
import InputDate from "../common/InputDate";
import {
  CardForm as CardFormT,
  PreparedField as PreparedFieldT,
  CustomField as CustomFieldT,
  CardFormField as CardFormFieldT,
} from "../../models/cardForm.model";
import { styled } from "styled-components";

interface Props {
  isOpen: boolean;
}

const CardForm = ({ isOpen }: Props) => {
  const [formData, setFormData] = useState<CardFormT>(initialCardFormData);
  const [error, setError] = useState<string | null>(null);
  const [snsCustomPlatform, setSnsCustomPlatform] = useState<string>("");
  const { validateField, validateAll } = useValidation();

  const navigate = useNavigate();
  const lastFieldRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData: CardFormT) => {
      const field = prevData[name as keyof CardFormT];
      if (typeof field === "object" && field !== null && "value" in field) {
        return {
          ...prevData,
          [name]: { ...field, value } as PreparedFieldT,
        };
      }
      return prevData;
    });

    const validationError = validateField(name, value);
    setError(validationError);
  };

  interface FieldWithVisibility extends PreparedFieldT {
    isPublic: boolean;
  }

  const handleVisibilityChange = (name: keyof CardFormT) => {
    setFormData((prevData: CardFormT) => {
      const field = prevData[name];
      if (typeof field === "object" && field !== null && "isPublic" in field) {
        return {
          ...prevData,
          [name]: {
            ...field,
            isPublic: !field.isPublic,
          } as FieldWithVisibility,
        };
      }
      return prevData;
    });
  };

  const handleBirthChange = (date: Date | null) => {
    if (!date) return;

    const today = new Date();
    const birthDate = new Date(date);
    const age =
      today.getFullYear() -
      birthDate.getFullYear() -
      (today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
        ? 1
        : 0);

    const formattedBirth = date.toISOString().split("T")[0];
    const birthday = `${birthDate.getMonth() + 1}월 ${birthDate.getDate()}일`;

    setFormData((prevData) => ({
      ...prevData,
      birth: { ...prevData.birth, value: formattedBirth },
      age: { ...prevData.age, value: age.toString() },
      birthday: { ...prevData.birthday, value: birthday },
    }));
  };

  const handleCustomFieldChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    setFormData((prevData) => {
      const updatedCustomFields = [
        ...(prevData.customFields.value as Array<{
          key: string;
          value: string;
          isPublic: boolean;
        }>),
      ];
      updatedCustomFields[index][field] = value;

      return {
        ...prevData,
        customFields: { ...prevData.customFields, value: updatedCustomFields },
      };
    });
  };

  const handleCustomFieldVisibilityChange = (index: number) => {
    setFormData((prevData) => {
      const updatedCustomFields = [
        ...(prevData.customFields.value as Array<{
          key: string;
          value: string;
          isPublic: boolean;
        }>),
      ];
      updatedCustomFields[index] = {
        ...updatedCustomFields[index],
        isPublic: !updatedCustomFields[index].isPublic,
      };

      return {
        ...prevData,
        customFields: {
          ...prevData.customFields,
          value: updatedCustomFields,
        },
      };
    });
  };

  const addCustomField = () => {
    if ("maxFields" in formData.customFields) {
      if (
        formData.customFields.value.length ===
        formData.customFields.maxFields - 1
      ) {
        setError("항목 추가는 최대 5개까지 가능합니다.");
      }

      setFormData((prevData) => ({
        ...prevData,
        customFields: {
          ...prevData.customFields,
          value: [
            ...(prevData.customFields.value as Array<{
              key: string;
              value: string;
              isPublic: boolean;
            }>),
            { key: "", value: "", isPublic: true },
          ],
        } as CustomFieldT,
      }));
    }
  };

  const removeCustomField = (index: number) => {
    if ("maxFields" in formData.customFields) {
      if (
        formData.customFields.value.length ===
          formData.customFields.maxFields &&
        error?.includes("항목 추가는 최대 5개까지 가능합니다.")
      ) {
        setError(null);
      }

      setFormData((prevData) => {
        const updatedCustomFields = [
          ...(prevData.customFields.value as Array<{
            key: string;
            value: string;
            isPublic: boolean;
          }>),
        ];
        updatedCustomFields.splice(index, 1);

        return {
          ...prevData,
          customFields: {
            ...prevData.customFields,
            value: updatedCustomFields,
          },
        };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("formData", formData);

    const isValid = validateAll(formData);
    if (!isValid) {
      setError("모든 필수 항목을 올바르게 입력해주세요.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "businessCards"), formData);
      navigate(`/card/${docRef.id}`);
      setError(null);
    } catch (err) {
      console.error("Error creating card:", err);
      setError("명함 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(initialCardFormData);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (error) {
      console.log("error", error);
    }
  }, [error]);

  useEffect(() => {
    if (lastFieldRef.current) {
      lastFieldRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formData.customFields.value.length]);

  const renderRequiredFields = () =>
    Object.entries(formData).map(([key, config]) => {
      if (typeof config !== "object" || config === null) return null;

      if ("isRequired" in config && !config.isRequired) {
        return null;
      }

      if (key === "birth") {
        return (
          <div key={`${key}-required`} className="date-field-group">
            <InputDate onChange={handleBirthChange} />
            <InputCheck
              size="extraLarge"
              label="공개"
              checked={config.isPublic}
              onChange={() => handleVisibilityChange(key as keyof CardFormT)}
            />
          </div>
        );
      }

      if (key === "birthday" || key === "age") {
        return (
          <div key={`${key}-disabled`} className="text-field-group">
            <InputText
              id={key}
              name={key}
              label={config.label}
              placeholder={config.label}
              type="text"
              onChange={handleChange}
              value={config.value as string}
              disabled
            />
            <InputCheck
              size="extraLarge"
              label="공개"
              checked={config.isPublic}
              onChange={() => handleVisibilityChange(key as keyof CardFormT)}
            />
          </div>
        );
      }

      if ("isRequired" in config && config.isRequired) {
        return (
          <div key={`${key}-required-field`} className="text-field-group">
            <InputText
              id={key}
              name={key}
              label={config.label}
              placeholder={config.label}
              type="text"
              value={config.value as string}
              onChange={handleChange}
              required
            />
            <InputCheck
              size="extraLarge"
              label="공개"
              checked={config.isPublic}
              onChange={() => handleVisibilityChange(key as keyof CardFormT)}
            />
          </div>
        );
      }

      return null;
    });

  const renderPreparedFields = () =>
    Object.entries(formData).map(([key, config]) => {
      if (key === "customFields") return null;
      if (typeof config !== "object" || config === null) return null;
      if ("isRequired" in config && config.isRequired) {
        return null;
      }

      if (key === "sns") {
        const snsConfig = config as CardFormFieldT;
        return (
          <div
            key={`${key}-sns-field`}
            className={`field-group ${
              snsCustomPlatform === "기타" ? "other" : ""
            }`}
          >
            <div>
              <div className="selector-field-group">
                <Selector
                  id={`${key}-platform`}
                  name={`${key}-platform`}
                  label={"SNS"}
                  value={snsCustomPlatform || ""}
                  options={[
                    { label: "Instagram", value: "Instagram" },
                    { label: "Twitter", value: "Twitter" },
                    { label: "Facebook", value: "Facebook" },
                    { label: "기타", value: "기타" },
                  ]}
                  onChange={(value) => {
                    setSnsCustomPlatform(value);
                    if (value !== "기타") {
                      setFormData((prevData) => ({
                        ...prevData,
                        sns: {
                          ...prevData.sns,
                          other: "",
                        },
                      }));
                    }
                  }}
                  placeholder="플랫폼 선택"
                />
                {snsCustomPlatform === "기타" && (
                  <InputText
                    name={`${key}-customPlatform`}
                    label="기타 플랫폼"
                    placeholder="플랫폼 이름 입력"
                    value={formData.sns.otherOption}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        sns: {
                          ...prevData.sns,
                          other: e.target.value,
                        },
                      }))
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <div className="text-field-group">
                <InputText
                  id={key}
                  name={key}
                  label={snsConfig.label}
                  placeholder="SNS 아이디"
                  value={snsConfig.value as string}
                  onChange={handleChange}
                />
                <InputCheck
                  size="extraLarge"
                  label="공개"
                  checked={snsConfig.isPublic}
                  onChange={() =>
                    handleVisibilityChange(key as keyof CardFormT)
                  }
                />
              </div>
            </div>
          </div>
        );
      }

      if ("options" in config) {
        return (
          <div key={`${key}-selector-field`} className="selector-field-group">
            <Selector
              id={key}
              name={key}
              label={config.label}
              value={config.value as string}
              options={config.options.map((option: string) => ({
                label: option,
                value: option,
              }))}
              onChange={(value: string) =>
                handleChange({
                  target: { name: key, value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              placeholder={config.label}
            />
            <InputCheck
              size="extraLarge"
              label={"공개"}
              checked={config.isPublic}
              onChange={() => handleVisibilityChange(key as keyof CardFormT)}
            />
          </div>
        );
      }

      return (
        <div key={`${key}-text-field`} className="text-field-group">
          <InputText
            id={key}
            name={key}
            label={config.label}
            placeholder={config.label}
            type="text"
            value={config.value as string}
            onChange={handleChange}
            required={"isRequired" in config ? config.isRequired : false}
          />
          <InputCheck
            size="extraLarge"
            label="공개"
            checked={config.isPublic}
            onChange={() => handleVisibilityChange(key as keyof CardFormT)}
          />
        </div>
      );
    });

  const renderCustomFields = () =>
    formData.customFields.value.map((field, index) => (
      <div
        key={`custom-field-${index}`}
        className="custom-field-group"
        ref={
          index === formData.customFields.value.length - 1 ? lastFieldRef : null
        }
      >
        <InputText
          name={`customFieldKey-${index}`}
          placeholder="추가할 항목의 이름"
          value={field.key}
          onChange={(e) =>
            handleCustomFieldChange(index, "key", e.target.value)
          }
          required
        />
        <div className="text-input-group">
          <InputText
            name={`customFieldValue-${index}`}
            placeholder="추가할 항목의 값"
            value={field.value}
            onChange={(e) =>
              handleCustomFieldChange(index, "value", e.target.value)
            }
            required
          />
          <InputCheck
            size="extraLarge"
            label="공개"
            checked={field.isPublic}
            onChange={() => handleCustomFieldVisibilityChange(index)}
          />
        </div>
        <Button size="small" onClick={() => removeCustomField(index)}>
          <FaTrash /> 삭제
        </Button>
      </div>
    ));

  return (
    <CardFormStyle onSubmit={handleSubmit}>
      <div className="form-title">
        <Button
          size="small"
          scheme="secondary"
          boxShadow="none"
          tooltip={`1. "항목 추가 버튼"으로 추가적인 정보를 입력할 수 있습니다. * 최대 5개까지 추가 가능합니다.\n2. "명함 생성 버튼"을 눌러 명함을 생성합니다. * 필수 입력 항목을 모두 입력해야 합니다.`}
        >
          <FaCircleInfo />
        </Button>
        <div className="button-group">
          <Button
            size="small"
            onClick={addCustomField}
            disabled={
              "maxFields" in formData.customFields &&
              formData.customFields.value.length >=
                formData.customFields.maxFields
            }
          >
            <FaPlus /> 항목 추가
          </Button>
          <Button size="small" type="submit" onClick={handleSubmit}>
            <FaPen /> 명함 생성
          </Button>
        </div>
        <div className="info">
          {error && (
            <Title size="small" color="error">
              {error}
            </Title>
          )}
        </div>
      </div>
      <div className="form-content">
        <Title size="small">* 다음 항목은 필수 입력 항목입니다.</Title>
        <form className="required">{renderRequiredFields()}</form>
        <hr />
        <Title size="small">* 다음 항목은 선택 입력 항목입니다.</Title>
        <form className="prepared">{renderPreparedFields()}</form>
        {formData.customFields.value.length != 0 && (
          <>
            <hr />
            <Title size="small">* 다음 항목은 추가 입력 항목입니다.</Title>
            <form className="custom">{renderCustomFields()}</form>
          </>
        )}
      </div>
    </CardFormStyle>
  );
};

export const CardFormStyle = styled.div`
  .form-title {
    .button-group {
      display: flex !important;
      flex-direction: row !important;
      gap: 0.5rem;
      padding-top: 0.5rem;
    }

    .info {
      margin-top: 1rem;
    }
  }

  .form-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    overflow: visible;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
    transition: all 0.1s ease;

    border-radius: ${({ theme }) => theme.borderRadius.default};
    background: ${({ theme }) => theme.color.blur};
    padding: 1rem;
    box-shadow: inset 4px -4px 4px rgba(0, 0, 0, 0.3);

    .field-group {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: end;

      &.other {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
        background: ${({ theme }) => theme.color.blur};
        padding: 1rem;
        border-radius: ${({ theme }) => theme.borderRadius.default};
        box-shadow: ${({ theme }) => theme.shadow.light};
      }
    }

    .input-text {
      grid-area: inputText;
      display: grid;
      grid-area: inputText;
      grid-template-areas: "label" "input";
      grid-template-rows: auto auto;

      label {
        grid-area: label;
        font-size: ${({ theme }) => theme.fontSize.extraSmall};
        margin-left: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      input {
        grid-area: input;
        width: 100%;
      }
    }

    .input-check {
      grid-area: inputCheck;
      display: grid;
      grid-template-areas: "label" "input";
      grid-template-rows: auto auto;
      column-gap: 0.5rem;
      row-gap: 0.25rem;

      label {
        grid-area: label;
        font-size: ${({ theme }) => theme.fontSize.extraSmall};
        display: flex;
        align-items: center;
        justify-content: center;
      }

      input {
        grid-area: input;
        width: 100%;
      }
    }

    .select-box {
      grid-area: selector;

      label {
        grid-area: label;
        margin-left: 1rem;
        font-size: ${({ theme }) => theme.fontSize.extraSmall};
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      input {
        grid-area: input;
        width: 100%;
      }
    }

    .text-field-group {
      display: grid;
      grid-template-areas: "inputText inputCheck";
      grid-template-columns: 2fr auto;
      grid-template-rows: 1fr;
      gap: 0.5rem;
      white-space: nowrap;
    }

    .selector-field-group {
      display: grid;
      grid-template-areas: "selector inputText inputCheck";
      grid-template-columns: 2fr auto auto;
      grid-template-rows: 1fr;
      gap: 0.5rem;
      white-space: nowrap;
      transition: all 0.1s ease;
    }

    .date-field-group {
      display: grid;
      grid-template-areas: "inputDate inputCheck";
      grid-template-columns: 2fr auto;
      grid-template-rows: 1fr;
      gap: 0.5rem;
      white-space: nowrap;
    }

    .custom-field-group {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.5rem;

      background: ${({ theme }) => theme.color.surface};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      box-shadow: ${({ theme }) => theme.shadow.default};

      .text-input-group {
        display: grid;
        grid-template-areas: "inputText inputCheck";
        grid-template-columns: 2fr auto;
        grid-template-rows: 1fr;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
        transition: all 0.1s ease;
      }
    }
  }
`;

export default CardForm;
