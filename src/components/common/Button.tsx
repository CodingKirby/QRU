import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
	onClick?: () => void; // 클릭 핸들러
	children?: React.ReactNode; // 버튼 텍스트 또는 콘텐츠
	icon?: React.ReactNode; // 선택적인 아이콘
	className?: string; // 추가적인 클래스명
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
	gap: 5%; /* 아이콘과 텍스트 사이의 간격 */
	padding: 5%; /* 부모 크기에 비례한 패딩 */
	font-size: 1.8vw; /* 화면 너비에 비례한 텍스트 크기 */
	font-weight: bold;
	color: #fff;
	background: #4db6ac;
	border: none;
	border-radius: 1vw;
	cursor: pointer;
	box-shadow: 0 0.4vw 1vw rgba(0, 0, 0, 0.2), inset 0 -0.4vw 0.4vw rgba(0, 0, 0, 0.3);
	width: 100%; /* 버튼 너비를 부모에 맞춤 */
	height: auto;
	white-space: nowrap; /* 텍스트 줄바꿈 방지 */
	overflow: hidden; /* 초과 텍스트 숨김 */
	text-overflow: ellipsis; /* 초과 텍스트 말줄임표 */
	transition: transform 0.2s ease, box-shadow 0.2s ease; /* 부드러운 애니메이션 */
	-webkit-tap-highlight-color: transparent; /* 모바일 터치 하이라이트 제거 */

	&:hover {
		transform: translateY(-0.4vw); /* 부드러운 이동 */
		box-shadow: 0 0.8vw 1.5vw rgba(0, 0, 0, 0.3), inset 0.4vw -0.6vw 0.6vw rgba(0, 0, 0, 0.2); /* hover 상태에서 더 강한 그림자 */
	}

	&:active {
		transform: translateY(0); /* 클릭 시 원래 위치 */
		box-shadow: 0 0.4vw 1vw rgba(0, 0, 0, 0.2), inset 0 -0.4vw 0.4vw rgba(0, 0, 0, 0.3); /* 클릭 시 기본 상태로 */
	}

	&:focus {
		outline: none;
	}

	&:focus-visible {
		outline: 0.2vw solid #81d4fa;
		outline-offset: 0.4vw;
	}
`;

export const ButtonIcon = styled.span`
	display: inline-flex;
	align-items: center;
	font-size: 2vw;
	color: #fff;
`;

export default Button;
