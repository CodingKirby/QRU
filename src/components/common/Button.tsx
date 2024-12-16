import styled, { CSSProp } from 'styled-components';
import { ButtonScheme, ButtonSize, Shadow } from '../../styles/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	icon?: React.ReactNode;
	size?: ButtonSize;
	scheme?: ButtonScheme;
	boxShadow?: Shadow;
	disabled?: boolean;
	isLoading?: boolean;
	styles?: CSSProp;
}

function Button({ children, icon, size, scheme, boxShadow, disabled, isLoading, ...props }: Props) {
	return (
		<ButtonStyle
			size={size}
			scheme={scheme}
			boxShadow={boxShadow}
			disabled={disabled}
			isLoading={isLoading}
			{...props}
		>
			{icon && <div className="buttonIcon">{icon}</div>}
			{children}
		</ButtonStyle>
	);
}

export const ButtonStyle = styled.button<Omit<Props, 'children'>>`
	min-height: 2.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bolder;
	line-height: 1;

	font-size: ${({ theme, size }) => (size ? theme.button[size].fontSize : theme.button.medium.fontSize)};
	padding: ${({ theme, size }) => (size ? theme.button[size].padding : theme.button.medium.padding)};
	gap: ${({ theme, size }) => (size ? theme.button[size].gap : theme.button.medium.gap)};

	color: ${({ theme, scheme }) => (scheme ? theme.buttonScheme[scheme].color : theme.buttonScheme.default.color)};
	background: ${({ theme, scheme }) =>
		scheme ? theme.buttonScheme[scheme].backgroundColor : theme.buttonScheme.default.backgroundColor};
	border: none;
	border-radius: ${({ theme }) => theme.borderRadius.default};
	box-shadow: ${({ theme, boxShadow }) => (boxShadow ? theme.shadow[boxShadow] : theme.shadow.default)};
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
	cursor: ${({ disabled }) => (disabled ? 'none' : 'pointer')};

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
	-webkit-tap-highlight-color: transparent; /* 모바일 터치 하이라이트 제거 */

	.buttonIcon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: ${({ theme, size }) => (size ? theme.button[size].fontSize : theme.button.medium.fontSize)};
	}

	&:hover {
		background: ${({ theme }) => theme.color.blur};
		box-shadow: ${({ theme }) => theme.shadow.default};
	}

	${({ styles }) => styles || ''}
`;

export default Button;
