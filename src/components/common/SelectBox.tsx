import React, { useState, useRef } from "react";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";

interface SelectBoxProps {
  id?: string;
  name: string;
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  onBlur?: (name: string, value: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
}

const Selector: React.FC<SelectBoxProps> = ({
  name,
  value,
  label,
  options,
  onChange,
  onBlur,
  placeholder = "선택하세요",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue); // 부모 컴포넌트에 값 전달
    setIsOpen(false);
    if (onBlur) {
      if (onBlur) onBlur(name, optionValue);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false); // 외부 클릭 시 닫기
        if (onBlur) {
          onBlur(name, value); // 현재 값을 onBlur로 전달
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value, name, onBlur]);

  return (
    <SelectorStyle ref={selectRef} $open={isOpen} className="select-box">
      <label>{label}</label>
      <div className="select-display" onClick={handleToggle}>
        {value
          ? options.find((option) => option.value === value)?.label
          : placeholder}
        <IoMdArrowDropdown className={`select-arrow ${isOpen ? "open" : ""}`} />
      </div>
      <div className="other-input">{children}</div>
      <ul className="options-list">
        {options.map((option) => (
          <li
            key={option.value}
            className={`option-item ${
              option.value === value ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </SelectorStyle>
  );
};

interface StyleProps {
  $open: boolean;
}

const SelectorStyle = styled.div<StyleProps>`
  position: relative;

  .select-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    box-shadow: ${({ theme }) => theme.shadow.light};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    background: ${({ theme }) => theme.color.blur};
    font-size: ${({ theme }) => theme.fontSize.small};
    cursor: pointer;
    line-height: 1.8;
    height: 2.5rem;
    z-index: 1000;

    .select-arrow {
      margin-left: 0.5rem;
      transition: transform 0.25s ease-in-out;
      font-size: ${({ theme }) => theme.fontSize.large};
      color: ${({ theme }) => theme.color.primary};

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .options-list {
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    max-height: ${({ $open }) => ($open ? "auto" : "0")};
    opacity: ${({ $open }) => ($open ? "1" : "0")};
    transform-origin: top;
    transform: ${({ $open }) => ($open ? "scaleY(1)" : "scaleY(0)")};
    transition: all 0.3s ease-in-out;

    position: absolute;
    top: 100%;
    max-height: 10rem;
    overflow-y: auto;
    margin: 0;
    padding: 0.5rem;

    list-style: none;
    box-shadow: ${({ theme }) => theme.shadow.default};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    background: ${({ theme }) => theme.color.surface};
    z-index: 2000;

    .option-item {
      padding: 0.5rem 1rem;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      cursor: pointer;
      margin: 0.5rem;
      white-space: nowrap;

      &.selected {
        background: ${({ theme }) => theme.color.blur};
        box-shadow: ${({ theme }) => theme.shadow.light};
      }

      &:hover {
        background: ${({ theme }) => theme.color.secondary};
        box-shadow: ${({ theme }) => theme.shadow.light};
      }
    }
  }
`;

export default Selector;
