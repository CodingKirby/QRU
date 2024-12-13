import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface QRULogoProps {
	children?: ReactNode;
}

const QRULogo: React.FC<QRULogoProps> = ({ children }) => {
	return (
		<LogoCard>
			<Content>
				<QRBox>
					<div></div>
					<div className="filled"></div>
					<div className="filled"></div>
					<div></div>
					<div className="filled"></div>
					<div className="filled"></div>
					<div></div>
					<div></div>
					<div className="filled"></div>
				</QRBox>
				<TextBox>
					<LogoText className="logo-text">QRU</LogoText>
					<SubText className="subtext">Your Digital Identity</SubText>
					<SubText className="subtext">나만의 디지털 명함으로 새로운 만남을 손쉽게!</SubText>
				</TextBox>
			</Content>
			{children && <ButtonContainer>{children}</ButtonContainer>}
		</LogoCard>
	);
};

const LogoCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50vw;
	max-height: 50vh;
	min-width: 30vw;
	aspect-ratio: 16 / 9;
	background: ${({ theme }) => theme.color.surface};
	border-radius: 2vw;
	box-shadow: 0 0.8vw 2vw rgba(0, 0, 0, 0.4), inset 0 -0.4vw 0.8vw rgba(0, 0, 0, 0.2);
	position: relative;
	transform-style: preserve-3d;
	transform: rotateX(15deg) rotateY(-15deg);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	padding: 6%;
	gap: 20%;
	will-change: transform, box-shadow;

	&:hover {
		transform: rotateX(0deg) rotateY(0deg);
		box-shadow: 0 0.8vw 2vw rgba(0, 0, 0, 0.5), inset 0 -0.6vw 1.2vw rgba(0, 0, 0, 0.15);
	}

	&:hover .logo-text {
		text-shadow: -0.3vw 0.2vw 0.2vw rgba(0, 0, 0, 0.1);
	}

	&:hover .subtext {
		text-shadow: -0.2vw 0.2vw 0.2vw rgba(0, 0, 0, 0.1);
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
`;

const QRBox = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 5%;
	width: 30%;
	height: auto;
	aspect-ratio: 1 / 1;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	will-change: transform, box-shadow;

	div {
		width: 100%;
		height: 100%;
		background: #e0f7fa;
		border-radius: 30%;
		box-shadow: 0 0.4vw 1vw rgba(0, 0, 0, 0.2), inset 0.3vw -0.3vw 0.6vw rgba(0, 0, 0, 0.3);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		will-change: transform, box-shadow;
	}

	.filled {
		background: ${({ theme }) => theme.color.primary};
		box-shadow: 0 0.4vw 1vw rgba(0, 0, 0, 0.5), inset 0.3vw -0.3vw 0.6vw rgba(0, 0, 0, 0.4);
		transform: rotateX(-5deg) rotateY(5deg);
	}

	.filled:hover {
		transform: rotateX(-5deg) rotateY(5deg);
		box-shadow: 0 0.4vw 1vw rgba(0, 0, 0, 0.5), inset 0 -0.3vw 0.6vw rgba(0, 0, 0, 0.3);
	}
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 60%;
	padding-left: 5%;
`;

const LogoText = styled.div`
	font-size: 3vw;
	font-weight: bolder;
	color: ${({ theme }) => theme.color.primary};
	text-shadow: -0.4vw 0.2vw 0.2vw rgba(0, 0, 0, 0.2);
	transition: text-shadow 0.3s ease;
`;

const SubText = styled.div`
	font-size: 1.3vw;
	color: ${({ theme }) => theme.color.text};
	margin-top: 2%;
	text-align: left;
	width: 100%;
	text-shadow: -0.4vw 0.2vw 0.3vw rgba(0, 0, 0, 0.2);
	transition: text-shadow 0.3s ease;
`;

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	cursor: pointer;
`;

export default QRULogo;
