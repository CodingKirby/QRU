import React from "react";
import styled from "styled-components";
import { FontSize } from "../../styles/theme";

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onBlur" | "onChange" | "size"
  > {
  size?: FontSize;
  label?: string;
  onBlur?: (name: string, checked: boolean) => void; // 커스텀 onBlur
  onChange?: (name: string, checked: boolean) => void; // 커스텀 onChange
}

const InputCheck = React.forwardRef<HTMLInputElement, Props>(
  ({ size, label, onBlur, onChange, ...props }, ref) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      if (onBlur) {
        onBlur(name, checked); // 커스텀 onBlur 호출
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      if (onChange) {
        onChange(name, checked);
      }
    };

    return (
      <InputCheckStyle $size={size} className="input-check">
        {label && <label>{label}</label>}
        <input
          type="checkbox"
          ref={ref}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
      </InputCheckStyle>
    );
  }
);

interface StyleProps {
  $size?: FontSize;
}

const InputCheckStyle = styled.div<StyleProps>`
  display: flex;
  cursor: pointer;
  user-select: none;

  span {
    color: ${({ theme }) => theme.color.text};
    font-size: ${({ theme }) => theme.fontSize.small};
  }

  input {
    max-width: ${({ $size, theme }) =>
      $size ? theme.fontSize[$size] : theme.fontSize.extraLarge};
    aspect-ratio: 1;
    cursor: pointer;
    appearance: none;
    border-radius: 8px;
    background: ${({ theme }) => theme.color.blur};
    box-shadow: ${({ theme }) => theme.shadow.light};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ $size, theme }) =>
      $size ? theme.fontSize[$size] : theme.fontSize.medium};

    &:checked {
      background: ${({ theme }) => theme.color.primary};
    }

    &:focus {
      box-shadow: ${({ theme }) => theme.shadow.default};
    }
  }
`;

export default InputCheck;
