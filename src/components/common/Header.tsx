// Header.tsx
import styled from "styled-components";
import QRULogo from "./Logo";
import Loading from "./Loading";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Navigation from "../header/Navigation";
import ThemeSwitcher from "../header/ThemeSwitcher";
import Drawer from "../header/Drawer";
import Search from "../header/Search";
import { FaGoogle, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useResponsive } from "../../hooks/useResponsive";
import { Link } from "react-router-dom";

function Header() {
  const { user, isLoading, handleGoogleLogin, handleLogout } = useAuth();
  const { isSearchOpen, isMobileOpen, toggleSearch } = useResponsive();
  const isLoggedIn = !!user;

  return (
    <HeaderStyle $isSearchOpen={isSearchOpen}>
      <div className="left-section">
        <Drawer />
        <QRULogo size="large" />
        <Navigation />
      </div>
      <Search
        isOpen={isSearchOpen}
        onToggle={toggleSearch}
        placeholder="찾고싶은 명함의 일련번호를 입력하세요"
      />
      <div className="right-section">
        {isLoading ? (
          <Button isLoading>
            <Loading size="small" />
          </Button>
        ) : (
          <>
            {isLoggedIn ? (
              <Dropdown
                toggleButton={
                  <>
                    {user?.photoURL ? (
                      <img
                        className="userCircle"
                        src={user.photoURL}
                        alt="user avatar"
                      />
                    ) : (
                      <FaUserCircle className="userCircle" />
                    )}
                  </>
                }
                className="auth"
              >
                <>
                  <ThemeSwitcher />
                  <Link to="/mypage" className="item">
                    마이 페이지
                  </Link>
                  <Button
                    className="item"
                    boxShadow="none"
                    onClick={handleLogout}
                  >
                    <FaGoogle />
                    로그아웃
                  </Button>
                </>
              </Dropdown>
            ) : (
              <>
                <Button onClick={isLoggedIn ? handleLogout : handleGoogleLogin}>
                  <FaGoogle />
                  로그인
                </Button>
                {!isMobileOpen && <ThemeSwitcher />}
              </>
            )}
          </>
        )}
      </div>
    </HeaderStyle>
  );
}

interface Props {
  $isSearchOpen: boolean;
}

const HeaderStyle = styled.header<Props>`
  position: fixed;
  width: 100%;
  height: 4rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  background: ${({ theme }) => theme.color.blur};
  box-shadow: ${({ theme }) => theme.shadow.light};
  gap: 1rem;
  z-index: 1000;
  overflow: visible;

  .left-section,
  .right-section {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      width: ${({ $isSearchOpen }) => ($isSearchOpen ? "0" : "")};
      opacity: ${({ $isSearchOpen }) => ($isSearchOpen ? 0 : 1)};
      transform: ${({ $isSearchOpen }) =>
        $isSearchOpen ? "scaleX(0)" : "scaleX(1)"};
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: ${({ $isSearchOpen }) =>
        $isSearchOpen ? "none" : "auto"};
    }
  }

  .left-section {
    justify-content: flex-start;
    transform-origin: left;

    .navigation {
      visibility: ${({ $isSearchOpen }) =>
        $isSearchOpen ? "hidden" : "visible"};
      width: ${({ $isSearchOpen }) => ($isSearchOpen ? "0" : "auto")};
      transform-origin: left;
      transform: ${({ $isSearchOpen }) =>
        $isSearchOpen ? "scaleX(0)" : "scaleX(1)"};
      opacity: ${({ $isSearchOpen }) => ($isSearchOpen ? 0 : 1)};
      transition: width 1s ease, transform 0.3s ease, opacity 0.3s ease;
    }
  }

  .right-section {
    justify-content: flex-end;
    transform-origin: right;

    .userCircle {
      width: 2.5rem;
      height: 2.5em;
      border-radius: 50%;
      object-fit: cover;
    }

    .auth {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      cursor: pointer;

      ul {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100px;

        li {
          a,
          button {
            font-size: 1rem;
            font-weight: 600;
            text-decoration: none;
            display: flex;
            align-item: center;
            justify-content: center;
            width: 100%;
            line-height: 1;
            background: none;
            border: 0;
            cursor: pointer;

            svg {
              margin-right: 6px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

export default Header;
