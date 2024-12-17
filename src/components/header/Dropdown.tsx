import styled from 'styled-components';

interface Props {
	children: React.ReactNode;
	isOpen: boolean;
	isMobile: boolean;
	onClick?: () => void;
}

function Dropdown({ children, isOpen = false, isMobile = false }: Props) {
	return (
		<DropdownStyle $open={isOpen} $mobile={isMobile}>
			<div className={isMobile ? 'mobile' : 'desktop'}>{children}</div>
		</DropdownStyle>
	);
}

interface DropdownStyleProps {
	$open: boolean;
	$mobile: boolean;
}

const DropdownStyle = styled.div<DropdownStyleProps>`
	height: ${({ $open }) => ($open ? 'auto' : '0')}; /* 드롭다운이 열렸을 때만 높이를 auto로 설정 */
	display: block;
	position: absolute;
	top: ${({ $mobile }) => ($mobile ? '3.5rem' : '100%')}; /* 모바일과 데스크톱에서 위치 조정 */
	left: 0;
	width: ${({ $mobile }) => ($mobile ? '100%' : 'auto')}; /* 모바일에서는 전체 너비 */
	padding-top: ${({ $mobile }) => ($mobile ? '0' : '0.5rem')}; /* 화살표와 메뉴 간의 여백 */
	z-index: 1000;

	/* 공통 스타일 */
	.desktop,
	.mobile {
		display: flex;
		flex-direction: column;
		font-size: ${({ theme }) => theme.fontSize.medium};

		box-shadow: ${({ theme }) => theme.shadow.default};
		padding: 0.8rem;
		gap: 0.5rem;
		z-index: 1000;

		/* 드롭다운 애니메이션 */
		transform-origin: top;
		transform: ${({ $open }) => ($open ? 'scaleY(1)' : 'scaleY(0)')};
		transition: transform 0.3s ease, opacity 0.3s ease;

		.item {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0.5rem 1rem;

			color: ${({ theme }) => theme.color.text};
			border-radius: ${({ theme }) => theme.borderRadius.default};
			cursor: pointer;
			transition: background 0.3s ease, box-shadow 0.3s ease;

			&:hover {
				background: ${({ theme }) => theme.color.secondary};
				box-shadow: ${({ theme }) => theme.shadow.default};
			}
		}
	}

	/* 데스크톱 화면 */
	.desktop {
		background: ${({ theme }) => theme.color.surface};
		border-radius: ${({ theme }) => theme.borderRadius.default};
		white-space: nowrap; /* 줄바꿈 방지 */

		/* 화살표 */
		&::before {
			content: '';
			position: absolute;
			width: 0;
			height: ${({ $open }) => ($open ? '0' : '0.5rem')}; /* 드롭다운이 닫혔을 때만 높이를 0.5rem으로 설정 */
			border-left: 0.5rem solid transparent;
			border-right: 0.5rem solid transparent;
			border-bottom: 0.5rem solid ${({ theme }) => theme.color.surface};
			top: -0.5rem;
			left: 2rem;
		}
	}

	/* 모바일 화면 */
	.mobile {
		background: ${({ theme }) => theme.color.background};
		padding: 1.5rem 1rem;
		border-radius: 0 0 ${({ theme }) => theme.borderRadius.rounded} ${({ theme }) => theme.borderRadius.rounded};
	}
`;

export default Dropdown;
