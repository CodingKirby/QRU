import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/themeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import QRULogo from '../common/Logo';
import Drawer from './Drawer';

const Header = () => {
	const { toggleTheme, themeName } = useContext(ThemeContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleLoginLogout = () => {
		alert('로그인/로그아웃 클릭!');
	};

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	return (
		<HeaderContainer>
			<LeftContainer>
				<DrawerContainer>
					<Drawer isOpen={isMenuOpen} onClick={toggleMenu} />
				</DrawerContainer>
				<QRULogo />
				<NavMenu>
					<NavItem onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
						어떤 서비스인가요?
						{isDropdownOpen && (
							<DropdownMenu>
								<DropdownItem>서비스 소개</DropdownItem>
								<DropdownItem>이용 방법</DropdownItem>
							</DropdownMenu>
						)}
					</NavItem>
					<NavItem>친구찾기</NavItem>
				</NavMenu>
			</LeftContainer>
			<RightContainer>
				<ButtonContainer>
					<LoginButton onClick={handleLoginLogout}>로그인</LoginButton>
					<LoginButton onClick={handleLoginLogout}>회원가입</LoginButton>
				</ButtonContainer>
				<ToggleThemeButton onClick={toggleTheme}>
					{themeName === 'light' ? <StyledIcon as={MdLightMode} /> : <StyledIcon as={MdDarkMode} />}
				</ToggleThemeButton>
			</RightContainer>
			{isMenuOpen && (
				<MobileNavMenu>
					<LoginButton onClick={handleLoginLogout}>로그인</LoginButton>
					<LoginButton onClick={handleLoginLogout}>회원가입</LoginButton>
					<NavItem>어떤 서비스인가요?</NavItem>
					<NavItem>친구찾기</NavItem>
				</MobileNavMenu>
			)}
		</HeaderContainer>
	);
};

const HeaderContainer = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 60px;
	background-color: ${({ theme }) => theme.color.blur};
	padding: 0.2rem 1.2rem;
	color: ${({ theme }) => theme.color.text};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -4px 10px rgba(0, 0, 0, 0.1);
`;

const LeftContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const DrawerContainer = styled.div`
	display: none; /* 기본 상태에서는 숨김 */

	@media (max-width: 768px) {
		display: flex; /* Flexbox를 사용하여 중앙 정렬 */
		align-items: center; /* 수직 중앙 정렬 */
		justify-content: center; /* 수평 중앙 정렬 */
		height: 100%; /* 부모(Header)의 높이를 기준으로 정렬 */
	}
`;

const NavMenu = styled.nav`
	display: flex;
	gap: 1rem;

	@media (max-width: 768px) {
		display: none;
	}
`;

const MobileNavMenu = styled.nav`
	display: none;
	flex-direction: column;
	gap: 0.5rem;
	position: absolute;
	left: 0;
	top: 60px;
	background-color: ${({ theme }) => theme.color.blur};
	width: 100%;
	padding: 1rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

	@media (max-width: 768px) {
		display: flex;
	}
`;

const NavItem = styled.div`
	padding: 0.5rem;
	cursor: pointer;
	font-size: 1rem;
	position: relative;

	&:hover {
		color: ${({ theme }) => theme.color.onText};
	}
`;

const DropdownMenu = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	background-color: ${({ theme }) => theme.color.blur};
	padding: 0.5rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const DropdownItem = styled.div`
	padding: 0.5rem;
	border-radius: ${({ theme }) => theme.borderRadius.default};
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.color.text};
		background-color: ${({ theme }) => theme.color.blur};
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 2px -4px 6px rgba(0, 0, 0, 0.1);
	}
`;

const RightContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;

	@media (max-width: 768px) {
		display: none;
	}
`;

const LoginButton = styled.button`
	height: 2.5rem;
	width: auto;
	max-width: 8rem;
	margin: 0.3rem;

	background-color: ${({ theme }) => theme.color.secondary};
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
		background-color: ${({ theme }) => theme.color.blur};
	}
`;

const ToggleThemeButton = styled.button`
	height: 2.5rem;
	aspect-ratio: 1 / 1;
	background-color: transparent;
	color: ${({ theme }) => theme.color.text};
	border: none;
	border-radius: ${({ theme }) => theme.borderRadius.default};
	padding: 0.5rem 1rem;
	cursor: pointer;
	font-size: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background-color: ${({ theme }) => theme.color.blur};
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 2px -4px 6px rgba(0, 0, 0, 0.1);
	}

	@media (max-width: 768px) {
		position: absolute;
		right: 1rem;
	}
`;

const StyledIcon = styled(MdLightMode)`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.color.text};
`;

export default Header;
