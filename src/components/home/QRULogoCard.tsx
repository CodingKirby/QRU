import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import Button from '../common/Button';

function QRULogo() {
	const handleCreateCard = () => {
		alert('나만의 명함 만들러 가기 클릭!');
	};

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
					<div className="logoText">QRU</div>
					<div className="subText">
						Your Digital Identity
						<br />
						나만의 디지털 명함으로 새로운 만남을 손쉽게!
					</div>
				</TextBox>
			</Content>
			<ButtonContainer>
				<Button
					onClick={handleCreateCard}
					size="large"
					scheme="primary"
					icon={<FaPlus />}
					hoverStyle={hoverStyle}
					activeStyle={activeStyle}
					focusStyle={focusStyle}
				>
					나만의 명함 만들러 가기
				</Button>
			</ButtonContainer>
		</LogoCard>
	);
}

const LogoCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-width: 240px;
	max-width: 1024px;
	aspect-ratio: 16 / 9;
	background: ${({ theme }) => theme.color.surface};
	border-radius: ${({ theme }) => theme.borderRadius.default};
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.2);
	position: relative;
	transform-style: preserve-3d;
	transform: rotateX(15deg) rotateY(-15deg);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	padding: 2rem;
	margin: 2rem 0;
	gap: 2rem;
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
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
	gap: 2rem;
`;

const QRBox = styled.div`
	display: grid;
	width: 40%;
	min-width: 60px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 5%;
	aspect-ratio: 1 / 1;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	will-change: transform, box-shadow;

	div {
		width: 100%;
		height: 100%;
		background: #e0f7fa;
		border-radius: 30%;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2), inset 3px -3px 6px rgba(0, 0, 0, 0.3);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		will-change: transform, box-shadow;
	}

	div:hover {
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3), inset 0 -3px 6px rgba(0, 0, 0, 0.5);
	}

	.filled {
		background: ${({ theme }) => theme.color.primary};
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), inset 0.3vw -3px 6px rgba(0, 0, 0, 0.4);
		transform: rotateX(-5deg) rotateY(5deg);
	}

	.filled:hover {
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), inset 0 -3px 6px rgba(0, 0, 0, 0.3);
	}
`;

const hoverStyle = `
	transform: translateY(-0.4vw);
	box-shadow: -1vw 1vw 1.5vw rgba(0, 0, 0, 0.3), inset 0.4vw -0.6vw 0.4vw rgba(0, 0, 0, 0.3);
`;

const activeStyle = `
	transform: translateY(0);
	box-shadow: 0 0.4vw 1vw rgba(0, 0, 0, 0.2), inset 0 -0.4vw 0.4vw rgba(0, 0, 0, 0.3);
`;

const focusStyle = `
	outline: none;
`;

const TextBox = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;

	.logoText {
		line-height: 1;
		font-size: ${({ theme }) => theme.fontSize.extraLarge};
		font-weight: bolder;
		color: ${({ theme }) => theme.color.primary};
		text-shadow: -4px 2px 2px rgba(0, 0, 0, 0.2);
		transition: text-shadow 0.3s ease;

		@media (max-width: 380px) {
			font-size: ${({ theme }) => theme.fontSize.medium};
		}
	}

	.subText {
		font-size: ${({ theme }) => theme.fontSize.small};
		color: ${({ theme }) => theme.color.text};
		text-align: left;
		width: 100%;
		text-shadow: -4px 2px 3px rgba(0, 0, 0, 0.2);
		transition: text-shadow 0.3s ease;

		@media (max-width: 380px) {
			font-size: ${({ theme }) => theme.fontSize.extraSmall};
		}
	}
`;

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	cursor: pointer;
`;

export default QRULogo;
