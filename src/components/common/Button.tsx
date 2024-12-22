import styled, { CSSProp } from "styled-components";
import { ButtonScheme, ButtonSize, Shadow } from "../../styles/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  icon?: React.ReactNode;
  size?: ButtonSize;
  scheme?: ButtonScheme;
  boxShadow?: Shadow;
  disabled?: boolean;
  isLoading?: boolean;
  styles?: string | CSSProp;
  tooltip?: string;
}

function Button({
  children,
  ref,
  icon,
  size,
  scheme,
  boxShadow,
  disabled,
  isLoading,
  tooltip,
  ...props
}: Props) {
  return (
    <ButtonStyle
      ref={ref}
      size={size}
      scheme={scheme}
      boxShadow={boxShadow}
      disabled={disabled}
      isLoading={isLoading}
      data-tooltip={tooltip}
      {...props}
    >
      {icon && <div className="icon">{icon}</div>}
      {children}
    </ButtonStyle>
  );
}

export const ButtonStyle = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["isLoading", "styles", "boxShadow"].includes(prop),
})<Omit<Props, "children" | "icon">>`
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;

  font-size: ${({ theme, size }) =>
    size ? theme.button[size].fontSize : theme.button.medium.fontSize};
  padding: ${({ theme, size }) =>
    size ? theme.button[size].padding : theme.button.medium.padding};
  gap: ${({ theme, size }) =>
    size ? theme.button[size].gap : theme.button.medium.gap};

  color: ${({ theme, scheme }) =>
    scheme
      ? theme.buttonScheme[scheme].color
      : theme.buttonScheme.default.color};
  background: ${({ theme, scheme }) =>
    scheme
      ? theme.buttonScheme[scheme].backgroundColor
      : theme.buttonScheme.default.backgroundColor};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: ${({ theme, boxShadow }) =>
    boxShadow ? theme.shadow[boxShadow] : theme.shadow.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "none" : "pointer")};

  white-space: nowrap;
  text-overflow: ellipsis;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(
      ${({ theme, size }) =>
          size ? theme.button[size].fontSize : theme.button.medium.fontSize} *
        1.8
    );
    aspect-ratio: 1/1;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme, size }) =>
      size ? theme.button[size].fontSize : theme.button.small.fontSize};
  }

  &:hover {
    background: ${({ theme }) => theme.color.blur};
    box-shadow: ${({ theme }) => theme.shadow.default};
  }

  &[data-tooltip]:hover::after,
  &[data-tooltip]:focus::after {
    width: 80%;
    content: attr(data-tooltip);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 1rem;
    padding: 1rem 1.5rem;
    background: ${({ theme }) => theme.color.error};
    color: ${({ theme }) => theme.color.onError};
    font-size: ${({ theme }) => theme.fontSize.extraSmall};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    box-shadow: ${({ theme }) => theme.shadow.default};
    white-space: pre-wrap;
    text-align: left;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.3s ease;
    line-height: 1.8;
  }

  &[data-tooltip]::after {
    opacity: 0;
    pointer-events: none;
  }

  ${({ styles }) => styles || ""}
`;

export default Button;
