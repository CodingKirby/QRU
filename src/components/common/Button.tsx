import styled from 'styled-components';
import { ButtonScheme, ButtonSize } from '../../styles/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	icon?: React.ReactNode;
	size: ButtonSize;
	scheme: ButtonScheme;
	disabled?: boolean;
	isLoading?: boolean;
	hoverStyle?: string;
	activeStyle?: string;
	focusStyle?: string;
}

function Button({ children, icon, size, scheme, disabled, isLoading, ...props }: Props) {
	return (
		<ButtonStyle size={size} scheme={scheme} disabled={disabled} isLoading={isLoading} {...props}>
			{icon && <div className="buttonIcon">{icon}</div>}
			{children}
		</ButtonStyle>
	);
}

export const ButtonStyle = styled.button<Omit<Props, 'children'>>`
	display: inline-flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	font-weight: bolder;

	font-size: ${({ theme, size }) => theme.button[size].fontSize};
	padding: ${({ theme, size }) => theme.button[size].padding};
	gap: ${({ theme, size }) => theme.button[size].gap};

	color: ${({ theme }) => theme.color.text};
	background: ${({ theme }) => theme.color.primary};
	border: none;
	border-radius: ${({ theme }) => theme.borderRadius.default};

	box-shadow: 0 0.4vw 1vw rgba(0, 0, 0, 0.2), inset 0 -0.4vw 0.6vw rgba(0, 0, 0, 0.3);
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
	cursor: ${({ disabled }) => (disabled ? 'none' : 'pointer')};

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: transform 0.2s ease, box-shadow 0.2s ease; /* 부드러운 애니메이션 */
	-webkit-tap-highlight-color: transparent; /* 모바일 터치 하이라이트 제거 */

	.buttonIcon {
		display: inline-flex;
		align-items: center;
		width: ${({ theme, size }) => theme.button[size].fontSize};
	}

	&:hover {
		${({ hoverStyle }) => hoverStyle || ''}
	}

	&:active {
		${({ activeStyle }) => activeStyle || ''}
	}

	&:focus {
		${({ focusStyle }) => focusStyle || ''}
	}

	@media (max-width: 768px) {
		font-size: ${({ theme }) => theme.button.medium.fontSize};
		padding: ${({ theme }) => theme.button.medium.padding};
		gap: ${({ theme }) => theme.button.medium.gap};

		.buttonIcon {
			width: ${({ theme }) => theme.button.medium.fontSize};
		}
	}
`;

export default Button;
