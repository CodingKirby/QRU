import React, { ForwardedRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: "text" | "email" | "password" | "number";
}

const InputText = React.forwardRef(
  (
    { placeholder, inputType, onChange, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyle
        placeholder={placeholder}
        ref={ref}
        type={inputType}
        onChange={onChange}
        {...props}
      />
    );
  }
);

const InputTextStyle = styled.input`a
  outline: none;
  border: none;
  box-shadow: ${({ theme }) => theme.shadow.light};
  overflow: visible;
  padding: 0.25rem 0.75rem;
  line-height: 1.8;

  color: ${({ theme }) => theme.color.text};
  background: ${({ theme }) => theme.color.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
`;

export default InputText;
