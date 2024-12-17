import styled from 'styled-components';

interface Props {
	isOpen: boolean;
	onClick: () => void;
}

const Drawer: React.FC<Props> = ({ isOpen, onClick }) => {
	return (
		<DrawerStyle isOpen={isOpen} onClick={onClick}>
			<span></span>
			<span></span>
			<span></span>
		</DrawerStyle>
	);
};

const DrawerStyle = styled.div<{ isOpen: boolean }>`
	position: relative;
	display: none;
	width: 1.5rem;
	aspect-ratio: 1.1 / 1;
	cursor: pointer;

	span {
		position: absolute;
		width: 100%;
		height: 0.2rem;
		background: ${({ theme }) => theme.color.text};
		left: 0;
		border-radius: 0.2rem;
		transition: all 0.3s ease;
	}

	/* Top bar */
	span:nth-of-type(1) {
		top: ${({ isOpen }) => (isOpen ? '50%' : '0')};
		transform: ${({ isOpen }) => (isOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(0) rotate(0)')};
	}

	/* Middle bar */
	span:nth-of-type(2) {
		top: 50%;
		opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
		transform: translateY(-50%);
	}

	/* Bottom bar */
	span:nth-of-type(3) {
		top: ${({ isOpen }) => (isOpen ? '50%' : '100%')};
		transform: ${({ isOpen }) => (isOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-100%) rotate(0)')};
	}

	@media (max-width: 768px) {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
`;

export default Drawer;
