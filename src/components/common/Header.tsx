import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/themeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import QRULogo from '../common/Logo';
import Drawer from './Drawer';
import Button from './Button';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
	const [isDrawerOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const drawerRef = useRef<HTMLDivElement | null>(null);

	const handleLoginLogout = () => {
		alert('로그인/로그아웃 클릭!');
	};

	const handleAbout = () => {
		alert('어떤 서비스인가요? 클릭!');
	};

	const handleSearch = () => {
		alert('친구찾기 클릭!');
	};

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	const toggleSearch = () => {
		if (window.innerWidth > 768) {
			setIsSearchOpen((prev) => !prev);
		} else {
			setIsMobileSearchOpen(true);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				drawerRef.current &&
				!drawerRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<HeaderStyle>
			<LeftContainer>
				{/* 드로어 */}
				<div className="drawer" ref={drawerRef}>
					<Drawer isOpen={isDrawerOpen} onClick={toggleMenu} />
				</div>
				{/* 로고 */}
				<QRULogo size="large" />
				{/* 네비게이션 */}
				<Navigator>
					<Item
						onClick={handleAbout}
						onMouseEnter={toggleDropdown}
						onMouseLeave={toggleDropdown}
						ref={dropdownRef}
					>
						<a href="/">어떤 서비스인가요?</a>
						{isDropdownOpen && (
							<Dropdown>
								<div className="item">서비스 소개</div>
								<div className="item">사용방법</div>
							</Dropdown>
						)}
					</Item>
					<Item onClick={handleSearch}>
						<a href="/">친구찾기</a>
					</Item>
				</Navigator>
			</LeftContainer>
			<RightContainer>
				<SearchContainer isOpen={isSearchOpen}>
					<input className="searchInput" type="text" placeholder="검색어를 입력하세요" />
					<Button onClick={toggleSearch}>
						<FaSearch />
					</Button>
				</SearchContainer>
				<Button onClick={handleLoginLogout}>로그인</Button>
				<div className="hideOnMobile">
					<Button onClick={handleLoginLogout}>회원가입</Button>
					<ThemeSwitcher />
				</div>
			</RightContainer>
			{/* 모바일 메뉴: 드로어 버튼을 누르면 나타남 */}
			<MoblieMenu className={isDrawerOpen ? 'open' : 'closed'}>
				<ThemeSwitcher />
				<Button onClick={handleLoginLogout}>회원가입</Button>
				<Item onClick={handleAbout}>어떤 서비스인가요?</Item>
				<Item onClick={handleSearch}>친구 찾기</Item>
			</MoblieMenu>
		</HeaderStyle>
	);
};

const ThemeSwitcher = () => {
	const { themeName, toggleTheme } = useContext(ThemeContext);
	return (
		<Button onClick={toggleTheme} scheme="secondary" boxShadow="none">
			{themeName === 'light' ? <MdLightMode /> : <MdDarkMode />}
		</Button>
	);
};

const HeaderStyle = styled.header`
	width: 100%;
	height: 3.5rem;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.2rem 1.2rem;
	color: ${({ theme }) => theme.color.text};
	background: ${({ theme }) => theme.color.blur};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -4px 10px rgba(0, 0, 0, 0.1);
	gap: 1rem;
`;

const LeftContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1.2rem;

	.drawer {
		display: none;

		@media (max-width: 768px) {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	}
`;

const Item = styled.div`
	padding: 0.5rem;
	cursor: pointer;
	font-size: ${({ theme }) => theme.fontSize.small};
	position: relative;

	a {
		color: ${({ theme }) => theme.color.text};
		font-size: ${({ theme }) => theme.fontSize.small};
		font-weight: bold;

		&:hover {
			color: ${({ theme }) => theme.color.primary};
		}
	}
`;

const Navigator = styled.nav`
	display: flex;
	gap: 1rem;

	@media (max-width: 768px) {
		display: none;
	}
`;

const MoblieMenu = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	position: absolute;
	left: 0;
	top: 3.5rem;
	background: ${({ theme }) => theme.color.background};
	width: 100%;
	padding: 1rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transform-origin: top;
	transition: transform 0.3s ease, opacity 0.3s ease;
	border-radius: 0 0 ${({ theme }) => theme.borderRadius.default} ${({ theme }) => theme.borderRadius.default};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -4px 10px rgba(0, 0, 0, 0.3);
	z-index: 1000;

	&.open {
		transform: scaleY(1);
		opacity: 1;
		transition: transform 0.3s ease, opacity 1s ease;
	}

	&.closed {
		transform: scaleY(0);
		opacity: 0;
		transition: transform 0.3s ease, opacity 1s ease;
	}
`;

const Dropdown = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	background: ${({ theme }) => theme.color.surface};
	padding: 0.5rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 2px -4px 6px rgba(0, 0, 0, 0.2);
	border-radius: ${({ theme }) => theme.borderRadius.default};
	z-index: 1000;

	.item {
		padding: 0.5rem;
		border-radius: ${({ theme }) => theme.borderRadius.default};
		cursor: pointer;

		&:hover {
			background: ${({ theme }) => theme.color.secondary};
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 2px -4px 6px rgba(0, 0, 0, 0.2);
		}
	}
`;

const RightContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 1rem;

	.hideOnMobile {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;

		@media (max-width: 768px) {
			display: none;
		}
	}
`;

const SearchContainer = styled.div<{ isOpen: boolean }>`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	overflow: visible;
	width: ${({ isOpen }) => (isOpen ? '15rem' : '5rem')};
	transition: width 0.3s ease;

	.searchInput {
		width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
		padding: ${({ isOpen }) => (isOpen ? '0.5rem' : '0')};
		opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
		border: ${({ theme }) => `1px solid ${theme.color.secondary}`};
		border-radius: ${({ theme }) => theme.borderRadius.default};
		transition: opacity 0.3s ease, padding 0.3s ease;
	}
`;

export default Header;
