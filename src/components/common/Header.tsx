import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/themeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import QRULogo from '../common/Logo';

const Header = () => {
	const { toggleTheme, themeName } = useContext(ThemeContext);

	const handleLoginLogout = () => {
		alert('로그인/로그아웃 클릭!');
	};

	return (
		<HeaderContainer>
			<NavMenu>
				<NavItem>
					<QRULogo />
				</NavItem>
				<NavItem>
					어떤 서비스인가요
					<Dropdown>
						<DropdownItem>왜 만들었나요</DropdownItem>
						<DropdownItem>어떻게 사용하나요</DropdownItem>
						<DropdownItem>누가 만들었나요</DropdownItem>
					</Dropdown>
				</NavItem>
				<NavItem>친구 찾기</NavItem>
			</NavMenu>
			<ButtonContainer>
				<LoginButton onClick={handleLoginLogout}>로그인</LoginButton>
				<LoginButton onClick={handleLoginLogout}>회원가입</LoginButton>
				<ToggleThemeButton onClick={toggleTheme}>
					{themeName === 'light' ? <StyledIcon as={MdLightMode} /> : <StyledIcon as={MdDarkMode} />}
				</ToggleThemeButton>
			</ButtonContainer>
		</HeaderContainer>
	);
};

const HeaderContainer = styled.header`
	height: 60px;
	background-color: ${({ theme }) => theme.color.blur};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.2rem 1.2rem;
	color: ${({ theme }) => theme.color.text};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -4px 10px rgba(0, 0, 0, 0.1);
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

const NavMenu = styled.nav`
	display: flex;
	gap: 1rem;
	position: relative;
`;

const NavItem = styled.div`
	position: relative;
	padding: 0.5rem;
	cursor: pointer;
	font-size: 1rem;

	&:hover {
		color: ${({ theme }) => theme.color.secondary};
	}

	&:hover > div {
		display: flex;
	}
`;

const Dropdown = styled.div`
	display: none;
	flex-direction: column;
	position: absolute;
	top: 100%;
	left: 0;
	color: ${({ theme }) => theme.color.third};
	background-color: white;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	text-shadow: none;
	border-radius: ${({ theme }) => theme.borderRadius.default};
	overflow: hidden;

	& > div {
		padding: 0.5rem 1rem;
		cursor: pointer;

		&:hover {
			background-color: ${({ theme }) => theme.color.secondary};
		}
	}
`;

const DropdownItem = styled.div`
	font-size: 0.9rem;
	color: ${({ theme }) => theme.color.primary};
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 0.5rem;

	max-height: 100%;
`;

const LoginButton = styled.button`
	width: auto;
	max-width: 8rem;
	margin: 0.3rem;

	background-color: ${({ theme }) => theme.color.third};
	color: ${({ theme }) => theme.color.text};
	border: none;
	border-radius: ${({ theme }) => theme.borderRadius.default};
	padding: 0.5rem 1rem;
	cursor: pointer;
	font-size: 1rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 2px -4px 6px rgba(0, 0, 0, 0.3);
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	&:hover {
		background-color: ${({ theme }) => theme.color.third};
	}
`;

const ToggleThemeButton = styled.button`
	margin: 0.3rem;
	aspect-ratio: 1 / 1;
	background-color: ${({ theme }) => theme.color.third};
	color: ${({ theme }) => theme.color.text};
	border: none;
	border-radius: ${({ theme }) => theme.borderRadius.default};
	padding: 0.5rem 1rem;
	cursor: pointer;
	font-size: 1rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 2px -4px 6px rgba(0, 0, 0, 0.3);
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);

	&:hover {
		background-color: ${({ theme }) => theme.color.third};
	}
`;

const StyledIcon = styled(MdLightMode)`
	font-size: 1.5rem; /* 아이콘 크기 조절 */
	color: ${({ theme }) => theme.color.text}; /* 테마 색상 반영 */
`;

export default Header;
