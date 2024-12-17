import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import Button from '../common/Button';
import InputText from '../common/InputText';
import { useEffect, useRef, useState } from 'react';

interface Props {
	isOpen: boolean;
	onClick: () => void;
	placeholder?: string;
}

function Search({ isOpen, onClick, placeholder }: Props) {
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null); // input 요소에 접근하기 위한 ref

	// isOpen이 true일 때 input에 포커스를 줌
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		// 버튼을 눌렀을 때 발생한 onBlur 이벤트를 무시
		if (event.relatedTarget && event.relatedTarget.tagName === 'BUTTON') {
			return;
		}
		onClick();
		setInputValue(''); // input 내용 초기화
	};

	return (
		<SearchStyle $open={isOpen}>
			<InputText
				ref={inputRef}
				type="text"
				placeholder={placeholder}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onBlur={handleBlur}
			/>
			<Button onClick={onClick}>
				<FaSearch />
			</Button>
		</SearchStyle>
	);
}

interface DropdownStyleProps {
	$open: boolean;
}

const SearchStyle = styled.div<DropdownStyleProps>`
	display: inline-flex;
	justify-content: flex-end;
	align-items: center;
	flex: 1;
	width: ${({ $open }) => ($open ? '100%' : '5rem')};
	overflow: visible;
	transition: width 1s ease;
	gap: 0.5rem;

	input {
		padding: 0.5rem 1rem;
		width: ${({ $open }) => ($open ? '100%' : '0')};
		opacity: ${({ $open }) => ($open ? 1 : 0)};
		transform-origin: right;
		transition: width 1s ease, opacity 0.3s ease;
		pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
	}
`;

export default Search;
