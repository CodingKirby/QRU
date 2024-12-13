import styled from 'styled-components';
import Logo from '../../assets/logo.svg?react';

interface StyledLogoProps {
	size?: string;
	color?: string;
}

const QRULogo = ({ size = '1.5rem', color }: StyledLogoProps) => {
	return (
		<LogoWrapper>
			<StyledLogo size={size} fill={color} />
			QRU
		</LogoWrapper>
	);
};

const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	font-size: 1.5rem;
	font-weight: bold;
	cursor: pointer;
	color: ${({ theme }) => theme.color.text};
	text-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
	overflow: visible;

	&:hover {
		transform: scale(1.1);
		transition: transform 0.3s ease;
	}
`;

const StyledLogo = styled(Logo)<StyledLogoProps>`
	width: ${({ size }) => size};
	height: ${({ size }) => size};
	fill: ${({ theme }) => theme.color.primary};
	transition: transform 0.3s ease, fill 0.3s ease;
	overflow: visible;
`;

export default QRULogo;
