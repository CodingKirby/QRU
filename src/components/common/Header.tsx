import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../services/firebase';
import {
	browserLocalPersistence,
	onAuthStateChanged,
	setPersistence,
	signInWithPopup,
	signOut,
	User,
} from 'firebase/auth';
import QRULogo from '../common/Logo';
import Button from './Button';
import ThemeSwitcher from '../header/ThemeSwitcher';
import Drawer from '../header/Drawer';
import Dropdown from '../header/Dropdown';
import Search from '../header/Search';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

// 네비게이션 아이템
const NAVITEM = [
	{
		title: '서비스 소개',
		link: '/about',
		subItems: [
			{
				title: '어떤 서비스인가요?',
				link: '/about',
			},
			{
				title: '어떻게 사용하나요?',
				link: '/about',
			},
		],
	},
	{ title: '명함 찾기', link: '/shuffle' },
];

function Header() {
	// 네비게이션 이동
	const navigate = useNavigate();
	const handleNavigation = (link: string) => {
		navigate(link);
	};

	// 사용자 인증
	const [user, setUser] = useState<User | null>(null);

	const handleGoogleLogin = async () => {
		try {
			await setPersistence(auth, browserLocalPersistence); // 로그인 지속성 설정
			const result = await signInWithPopup(auth, provider);
			setUser(result.user);
			console.log('User info:', result.user);
		} catch (error) {
			if (error instanceof Error) {
				console.error('Google Login Error:', error.message);
				alert(`Login failed: ${error.message}`);
			} else {
				console.error('Unexpected error:', error);
			}
		}
	};

	// 로그아웃
	const handleLogout = async () => {
		try {
			await signOut(auth);
			setUser(null);
		} catch (error) {
			console.error('Logout Error:', error);
		}
	};

	// 새로고침 시 로그인 상태 유지
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	// 상태 관리
	const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);

	// Drawer와 Dropdown의 참조
	const drawerRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDrawer = () => {
		setIsDrawerOpen((prev) => !prev);
	};

	const toggleSearch = () => {
		setIsSearchOpen((prev) => !prev);
	};

	// 화면 크기 감지
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768); // 768px 이하일 경우 모바일로 간주
			if (window.innerWidth > 768) {
				setOpenDropdownIndex(null); // 드롭다운 초기화
				setIsDrawerOpen(false); // 드로어 닫기
			}
		};
		handleResize(); // 초기 렌더링 시 실행
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// 외부 클릭 감지
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				isDrawerOpen &&
				!drawerRef.current?.contains(event.target as Node) &&
				!dropdownRef.current?.contains(event.target as Node)
			) {
				setIsDrawerOpen(false);
				setOpenDropdownIndex(null);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [isDrawerOpen, openDropdownIndex]);

	return (
		<HeaderStyle $isSearchOpen={isSearchOpen}>
			<div className="left-section" ref={drawerRef}>
				{/* 드로어 */}
				<Drawer isOpen={isDrawerOpen} onClick={toggleDrawer} />
				{/* 로고 */}
				<QRULogo size="large" />
				{/* 네비게이션 */}
				{!isMobile && (
					<nav className="navigation">
						<ul>
							{NAVITEM.map((item, index) => (
								<li
									key={index}
									onMouseEnter={() => item.subItems && setOpenDropdownIndex(index)}
									onMouseLeave={() => setOpenDropdownIndex(null)}
								>
									<a
										href={item.link}
										className={`nav-link ${openDropdownIndex === index ? 'hover' : ''}`}
										aria-haspopup={!!item.subItems}
										aria-expanded={openDropdownIndex === index}
									>
										{item.title}
									</a>
									{/* 드롭다운 */}
									<Dropdown isOpen={openDropdownIndex === index} isMobile={isMobile}>
										{item.subItems?.map((subItem, subIndex) => (
											<div
												key={subIndex}
												className="item"
												onClick={() => handleNavigation(subItem.link)}
											>
												{subItem.title}
											</div>
										))}
									</Dropdown>
								</li>
							))}
						</ul>
					</nav>
				)}
			</div>
			<div className="search-section">
				<Search
					isOpen={isSearchOpen}
					onClick={toggleSearch}
					placeholder="찾고싶은 명함의 일련번호를 입력하세요"
				/>
			</div>
			<div className="right-section">
				<Button onClick={user ? handleLogout : handleGoogleLogin}>
					{user ? (
						<>
							<FaSignOutAlt />
							{!isMobile && ' 로그아웃'}
						</>
					) : (
						<>
							<FaSignInAlt />
							{!isMobile && ' 로그인'}
						</>
					)}
				</Button>

				{!isMobile && (
					<>
						<ThemeSwitcher />
					</>
				)}
			</div>
			{/* 모바일 드롭다운 */}
			{isMobile && isDrawerOpen && (
				<Dropdown isOpen={isDrawerOpen} isMobile={isMobile}>
					<ThemeSwitcher styles={{ width: '100%' }} />
					{NAVITEM.map((item, index) => (
						<div
							key={index}
							className="item"
							onClick={() => {
								handleNavigation(item.link);
							}}
						>
							{item.title}
						</div>
					))}
				</Dropdown>
			)}
		</HeaderStyle>
	);
}

const HeaderStyle = styled.header<{ $isSearchOpen: boolean }>`
	width: 100%;
	height: 4rem;
	margin: 0 auto;
	padding: 0 2.5rem;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	color: ${({ theme }) => theme.color.text};
	background: ${({ theme }) => theme.color.blur};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -4px 10px rgba(0, 0, 0, 0.1);
	gap: 1rem;
	position: relative; /* 부모 요소를 기준으로 드롭다운이 제대로 렌더링되도록 설정 */

	.left-section,
	.right-section {
		display: flex;
		align-items: center;
		gap: 1rem;

		@media (max-width: 768px) {
			display: ${({ $isSearchOpen }) => ($isSearchOpen ? 'none' : 'flex')};
			opacity: ${({ $isSearchOpen }) => ($isSearchOpen ? 0 : 1)};
			visibility: ${({ $isSearchOpen }) => ($isSearchOpen ? 'hidden' : 'visible')};
			animation: ${({ $isSearchOpen }) => ($isSearchOpen ? 'slideOut' : 'slideIn')} 0.5s ease;
			transition: opacity 0.5s ease, visibility 0.5s ease;
			pointer-events: ${({ $isSearchOpen }) => ($isSearchOpen ? 'none' : 'auto')};
		}
	}

	.left-section {
		justify-content: flex-start;
		transform-origin: left;
	}

	.right-section {
		justify-content: flex-end;
		transform-origin: right;
	}

	.search-section {
		display: flex;
		justify-content: center;
		flex: 1;
		width: auto;
		max-width: ${({ theme }) => theme.maxWidth};
	}

	.navigation {
		ul {
			display: flex;
			gap: 1.5rem;

			li {
				position: relative;

				.nav-link {
					font-size: ${({ theme }) => theme.fontSize.medium};
					font-weight: 500;
					color: ${({ theme }) => theme.color.text};
					text-decoration: none;
					transition: color 0.3s ease;

					&.hover {
						color: ${({ theme }) => theme.color.primary};
					}
				}
			}
		}

		@media (max-width: 768px) {
			display: none;
		}
	}

	@media (max-width: 768px) {
		padding: 0 1rem;
	}

	@keyframes slideIn {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	@keyframes slideOut {
		from {
			transform: scaleX(1);
		}
		to {
			transform: scaleX(0);
		}
	}
`;

export default Header;
