import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { FaSearch } from "react-icons/fa";
import Button from "../common/Button";
import InputText from "../common/InputText";

interface Props {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

function Search({ isOpen, onToggle, placeholder, onSearch }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 검색창 열리면 input에 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onToggle(false); // 검색창 닫기
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isOpen && inputRef.current?.value) {
      // 입력값이 있으면 검색 실행
      onSearch?.(inputRef.current.value);
    } else {
      // 검색창 열기/닫기
      onToggle(!isOpen);
      if (!isOpen && inputRef.current) {
        inputRef.current.value = ""; // 닫힐 때 입력값 초기화
      }
    }
  };

  return (
    <SearchStyle ref={containerRef} $open={isOpen}>
      <InputText ref={inputRef} type="text" placeholder={placeholder} />
      <Button onMouseDown={handleToggle}>
        <FaSearch />
      </Button>
    </SearchStyle>
  );
}

interface StyleProps {
  $open: boolean;
}

const SearchStyle = styled.div<StyleProps>`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
  width: ${({ $open }) => ($open ? "100%" : "5rem")};

  overflow: visible;
  transition: width 1s ease;
  gap: 0.5rem;

  input {
    padding: 0.5rem 1rem;
    width: ${({ $open }) => ($open ? "100%" : "0")};
    max-width: ${({ theme }) => theme.layout.width.medium};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transform-origin: right;
    transition: width 1s ease, opacity 1s ease;
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  }
`;

export default Search;
