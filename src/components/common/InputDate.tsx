import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onChange: (date: Date | null) => void;
}

const InputDate = ({ onChange }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <InputDateStyle>
      <label htmlFor="custom-date-picker">생년월일</label>
      <DatePicker
        id="custom-date-picker"
        selected={selectedDate}
        onChange={handleDateChange}
        showYearDropdown
        yearDropdownItemNumber={130}
        scrollableYearDropdown
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택하세요"
        className="custom-datepicker"
        closeOnScroll={true}
        shouldCloseOnSelect={true}
        maxDate={new Date()}
      />
    </InputDateStyle>
  );
};

const InputDateStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  z-index: 1000;

  label {
    margin-left: 0.5rem;
    font-size: ${({ theme }) => theme.fontSize.extraSmall};
    color: ${({ theme }) => theme.color.text};
    pointer-events: none;
  }

  .custom-datepicker {
    width: 100%;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    background-color: ${({ theme }) => theme.color.blur};
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.color.text};
    box-shadow: ${({ theme }) => theme.shadow.light};
    outline: none;

    &:hover {
      border-color: ${({ theme }) => theme.color.primary};
    }

    &:focus {
      border-color: ${({ theme }) => theme.color.primary};
      box-shadow: ${({ theme }) => theme.shadow.default};
    }
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.onPrimary};
    border-bottom: none;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header {
    font-size: ${({ theme }) => theme.fontSize.medium};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.onSecondary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  .react-datepicker__day:hover {
    background-color: ${({ theme }) => theme.color.primaryVariant};
    color: ${({ theme }) => theme.color.onPrimary};
  }

  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown {
    background-color: ${({ theme }) => theme.color.surface};
    color: ${({ theme }) => theme.color.text};
    border: 1px solid ${({ theme }) => theme.color.border};
  }

  .react-datepicker__year-option:hover,
  .react-datepicker__month-option:hover {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.onPrimary};
  }
`;

export default InputDate;
