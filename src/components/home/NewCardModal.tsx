import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import {
  addCustomField,
  removeCustomField,
  resetForm,
} from "../../store/slices/formSlice";
import {
  setError,
  clearAllErrors,
  clearError,
} from "../../store/slices/errorSlice";
import { FieldType } from "../../types/formType";
import { FORM_FIELDS } from "../../data/formFields";
import { saveToFirestore } from "../../utils/firestoreUtil";
import { closeModal } from "../../store/slices/modalSlice";

import styled from "styled-components";
import Form from "../../components/common/Form";
import Button from "../../components/common/Button";
import { FaCircleInfo, FaPen, FaPlus } from "react-icons/fa6";
import Title from "../../components/common/Title";
import Modal from "../common/Modal";

function NewCardModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const { customFields } = useSelector((state: RootState) => state.form);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = () => {
    dispatch(resetForm());
    dispatch(clearAllErrors());
    dispatch(closeModal());
  };

  useEffect(() => {
    if (customFields.length > 0 && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [customFields]);

  const handleAddField = () => {
    if (customFields.length >= 5) {
      dispatch(
        setError({
          fieldId: "customFields",
          message: "추가 항목은 최대 5개까지 입력할 수 있습니다.",
        })
      );
      return;
    }

    dispatch(addCustomField());
  };

  const handleRemoveField = (id: string) => {
    dispatch(removeCustomField(id));
    dispatch(clearError("customFields"));
  };

  const handleSubmit = async (data: {
    values: Record<string, string>;
    isPublic: Record<string, boolean>;
  }) => {
    try {
      console.log("Submitting data:", data);

      // Firestore에 데이터 저장
      const docId = await saveToFirestore("cards", {
        ...data,
        createdAt: new Date().toISOString(),
      });

      console.log("Document saved with ID:", docId);
      dispatch(clearAllErrors());
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const errors = useSelector((state: RootState) => state.error.errors);
  const latestError = errors[errors.length - 1]?.message;

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <StyledNewCard>
        <div className="form-title">
          <div className="form-title-buttons">
            <Button
              size="small"
              scheme="secondary"
              boxShadow="none"
              tooltip={`1. "항목 추가 버튼"으로 추가적인 정보를 입력할 수 있습니다.\n* 최대 5개까지 추가 가능합니다.\n2. "명함 생성 버튼"을 눌러 명함을 생성합니다.\n* 필수 입력 항목을 모두 입력해야 합니다.\n3. 각 항목에 대한 공개 여부를 선택할 수 있습니다.\n4. 비회원의 경우 1개월 동안만 명함이 유지됩니다.\n5. 비회원의 경우 생성한 명함을 수정 및 삭제하기 위해서는 생성 시 고지된 일련번호와 입력하신 비밀번호가 필요합니다.\n* 회원의 경우 마이 페이지에서 명함을 확인 및 관리할 수 있습니다.`}
            >
              <FaCircleInfo />
            </Button>
            <Button size="small" onClick={handleAddField}>
              <FaPlus /> 항목 추가
            </Button>
            <Button size="small" type="submit" form="form">
              <FaPen /> 명함 생성
            </Button>
          </div>
          <div className="form-info">
            <Title size="small" color="error">
              {errors && errors.length > 0 ? (
                latestError
              ) : (
                <>
                  <FaCircleInfo /> 에 마우스를 올려 사용 방법을 반드시
                  숙지해주세요.
                </>
              )}
            </Title>
          </div>
        </div>
        <div className="form-content" ref={scrollRef}>
          <Form
            key="content"
            fields={[
              ...FORM_FIELDS,
              ...customFields.map((field) => ({
                ...field,
                label: "추가 정보",
                type: "custom" as FieldType,
                required: true,
              })),
            ]}
            onSubmit={handleSubmit}
            onCustomFieldRemove={(id) => handleRemoveField(id)}
          />
        </div>
      </StyledNewCard>
    </Modal>
  );
}

const StyledNewCard = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
  overflow: clip;

  .form-title {
    position: sticky;
    top: 0;
    left: 0;

    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem 1rem 0.5rem 1rem;
    overflow: visible;
    z-index: 10;

    .form-title-buttons {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }

    .form-info {
      font-size: ${({ theme }) => theme.fontSize.small};
      color: ${({ theme }) => theme.color.error};
      margin: 0 1.2rem 0 1.2rem;
    }
  }

  .form-content {
    padding: 0 2rem 2rem 2rem;
    overflow-y: scroll;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    scroll-behavior: smooth;
    backdrop-filter: blur(8px);
  }
`;

export default NewCardModal;
