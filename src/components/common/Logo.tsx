import styled from 'styled-components';
import Logo from '../../assets/logo.svg?react';

interface StyledLogoProps {
	size?: string;
}

const QRULogo = ({ size = '2rem' }: StyledLogoProps) => {
	return (
		<LogoWrapper>
			<StyledLogo size={size} />
		</LogoWrapper>
	);
};

const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledLogo = styled(Logo)<StyledLogoProps>`
	width: ${({ size }) => size};
	height: ${({ size }) => size};
	transition: transform 0.3s ease, fill 0.3s ease;

	&:hover {
		transform: scale(1.1); // 크기 확대 효과
	}
`;

export default QRULogo;
