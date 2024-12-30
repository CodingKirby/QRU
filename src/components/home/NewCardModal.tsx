import { useEffect, useRef, useState } from "react";
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
import { FaCircleInfo, FaPen, FaPlus, FaX } from "react-icons/fa6";
import Modal from "../common/Modal";
import InputText from "../common/InputText";
import { FaCheck } from "react-icons/fa";
import { addToast } from "../../store/slices/toastSlice";
import { encryptPassword } from "../../utils/passwordUtil";

function NewCardModal() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const errors = useSelector((state: RootState) => state.error.errors);

  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const { customFields } = useSelector((state: RootState) => state.form);

  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [pendingPayload, setPendingPayload] = useState<Payload | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = () => {
    closePasswordPopup();
    dispatch(resetForm());
    dispatch(clearAllErrors());
    dispatch(closeModal());
  };

  interface Payload {
    values: Record<string, string>;
    isPublic: Record<string, boolean>;
    createdAt: string;
    uid: string | null;
    password?: string;
    [key: string]: unknown;
  }

  const openPasswordPopup = (payload: Payload) => {
    setPendingPayload(payload);
    setIsPasswordPopupOpen(true);
  };

  const closePasswordPopup = () => {
    setPassword("");
    setIsPasswordPopupOpen(false);
    setPendingPayload(null);
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
    const collectionName = user ? "cards" : "guestCards";
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
      uid: user?.uid || null,
    };

    if (!user) {
      openPasswordPopup(payload);
      return;
    }

    await saveCard(payload, collectionName);
  };

  const saveCard = async (payload: Payload, collectionName: string) => {
    try {
      const docId = await saveToFirestore(collectionName, payload);
      console.log("Document saved with ID:", docId);
      dispatch(
        addToast({
          type: "success",
          message: "명함이 성공적으로 생성되었습니다.",
        })
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error saving data:", error);
      dispatch(
        addToast({
          type: "error",
          message: "명함 생성 중 오류가 발생했습니다.",
        })
      );
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const latestError = errors[errors.length - 1];
      if (latestError) {
        dispatch(
          addToast({
            type: "error",
            message: latestError.message,
          })
        );
      }
    }
  }, [errors, dispatch]);

  const validatePassword = async () => {
    if (password.length < 6) {
      dispatch(
        addToast({
          type: "error",
          message: "비밀번호는 6자 이상 입력해주세요.",
        })
      );
      return false;
    }
    return true;
  };

  const handlePasswordSubmit = async () => {
    const isPasswordValid = await validatePassword();
    if (isPasswordValid && pendingPayload) {
      pendingPayload.password = await encryptPassword(password);
      await saveCard(pendingPayload, "guestCards");
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <StyledNewCard>
          <div className="form-title">
            <div className="form-title-buttons">
              <Button
                size="small"
                scheme="secondary"
                boxShadow="none"
                tooltip={`1. "항목 추가 버튼"으로 추가적인 정보를 입력할 수 있습니다.\n* 최대 5개까지 추가 가능합니다.\n2. "명함 생성 버튼"을 눌러 명함을 생성합니다.\n* 필수 입력 항목을 모두 입력해야 합니다.\n3. 각 항목에 대한 공개 여부를 선택할 수 있습니다.\n* 공개로 설정하신 항목의 내용은 비울 수 없습니다.\n4. 비회원의 경우 1개월 동안만 명함이 유지됩니다.\n5. 비회원의 경우 생성한 명함을 수정 및 삭제하기 위해서는 생성 시 고지된 일련번호와 입력하신 비밀번호가 필요합니다.\n* 회원의 경우 마이 페이지에서 명함을 확인 및 관리할 수 있습니다.`}
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
          </div>
          <div className="form-content" ref={scrollRef}>
            <Form
              key="content"
              fields={[
                ...FORM_FIELDS,
                ...customFields.map((field) => ({
                  ...field,
                  required: true,
                  label: "추가 정보",
                  type: "custom" as FieldType,
                })),
              ]}
              onSubmit={handleSubmit}
              onCustomFieldRemove={(id) => handleRemoveField(id)}
            />
          </div>
        </StyledNewCard>
      </Modal>
      {isPasswordPopupOpen && (
        <PasswordPopup>
          <div className="popup-content">
            <label htmlFor="password">비밀번호 (6자 이상)</label>
            <InputText
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
            <div className="popup-buttons">
              <Button
                size="small"
                scheme="primary"
                onClick={handlePasswordSubmit}
              >
                <FaCheck /> 확인
              </Button>
              <Button size="small" onClick={closePasswordPopup}>
                <FaX /> 취소
              </Button>
            </div>
          </div>
        </PasswordPopup>
      )}
    </>
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
  }

  .form-content {
    padding: 0 2rem 2rem 2rem;
    overflow-y: scroll;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    scroll-behavior: smooth;
    backdrop-filter: blur(8px);
  }
`;

const PasswordPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.color.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: ${({ theme }) => theme.shadow.default};
  z-index: 9999;

  .popup-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      font-size: 1rem;
      font-weight: bold;
    }

    .popup-buttons {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
    }
  }
`;

export default NewCardModal;
