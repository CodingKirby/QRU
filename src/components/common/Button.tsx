import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
	onClick?: () => void;
	children?: React.ReactNode;
	icon?: React.ReactNode;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, icon, className }) => {
	return (
		<StyledButton onClick={onClick} className={className}>
			{icon && <ButtonIcon>{icon}</ButtonIcon>}
			{children}
		</StyledButton>
	);
};

export const StyledButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 5%;
	padding: 5%;
	font-size: 1.8vw;
	font-weight: bold;
	color: ${({ theme }) => theme.color.text};
	background: ${({ theme }) => theme.color.primary};
	border: none;
	border-radius: 1vw;
	cursor: pointer;
	box-shadow: 0 0.4vw 1vw rgba(0, 0, 0, 0.2), inset 0 -0.4vw 0.6vw rgba(0, 0, 0, 0.3);
	width: 100%;
	height: auto;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: transform 0.2s ease, box-shadow 0.2s ease; /* 부드러운 애니메이션 */
	-webkit-tap-highlight-color: transparent; /* 모바일 터치 하이라이트 제거 */

	&:hover {
		transform: translateY(-0.4vw);
		box-shadow: -1vw 1vw 1.5vw rgba(0, 0, 0, 0.3), inset 0.4vw -0.6vw 0.4vw rgba(0, 0, 0, 0.3); /* hover 상태에서 더 강한 그림자 */
	}

	&:active {
		transform: translateY(0); /* 클릭 시 원래 위치 */
		box-shadow: 0 0.4vw 1vw rgba(0, 0, 0, 0.2), inset 0 -0.4vw 0.4vw rgba(0, 0, 0, 0.3); /* 클릭 시 기본 상태로 */
	}

	&:focus {
		outline: none;
	}
`;

export const ButtonIcon = styled.span`
	display: inline-flex;
	align-items: center;
	font-size: 2vw;
`;

export default Button;
