import React from "react";
import styled from "styled-components";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onBlur"> {
  label?: string;
  placeholder?: string;
  inputType?: "text" | "email" | "password" | "number";
  onBlur?: (name: string, value: string) => void; // 커스텀 onBlur
}

const InputText = React.forwardRef<HTMLInputElement, Props>(
  (
    { label, placeholder, inputType = "text", onBlur, onChange, ...props },
    ref
  ) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (onBlur) {
        onBlur(name, value); // 커스텀 onBlur 호출
      }
    };

    return (
      <InputTextStyle className="input-text">
        {label && <label>{label}</label>}
        <input
          placeholder={placeholder}
          ref={ref}
          type={inputType}
          onBlur={handleBlur} // 커스텀 onBlur 전달
          onChange={onChange}
          {...props}
        />
      </InputTextStyle>
    );
  }
);

const InputTextStyle = styled.div`
  display: flex;
  width: 100%;
  line-height: 1.8;

  input {
    display: flex;
    width: 100%;
    border: none;
    outline: none;
    box-shadow: ${({ theme }) => theme.shadow.light};
    overflow: visible;
    padding: 0.5rem 1rem;
    line-height: 1.8;

    color: ${({ theme }) => theme.color.text};
    background: ${({ theme }) => theme.color.blur};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: ${({ theme }) => theme.fontSize.extraSmall};

    &:focus {
      box-shadow: ${({ theme }) => theme.shadow.default};
      background: ${({ theme }) => theme.color.surface};
    }

    &::placeholder {
      color: ${({ theme }) => theme.color.textSecondary};
    }
  }
`;

export default InputText;
