import styled from "styled-components";
import Dropdown from "../common/Dropdown";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { NAVIGATION } from "../../data/navigation";

function Drawer() {
  return (
    <Dropdown
      toggleButton={
        <StyledDrawerButton>
          <span></span>
          <span></span>
          <span></span>
        </StyledDrawerButton>
      }
      className="drawer"
    >
      <ThemeSwitcher />
      {NAVIGATION.map((item, index) => (
        <Link to={item.link} key={index} className="item">
          {item.title}
        </Link>
      ))}
    </Dropdown>
  );
}

const StyledDrawerButton = styled.div`
  position: relative;
  width: 1.5rem;
  aspect-ratio: 1.1 / 1;
  cursor: pointer;

  span {
    position: absolute;
    width: 100%;
    height: 0.2rem;
    background: ${({ theme }) => theme.color.text};
    left: 0;
    border-radius: 0.2rem;
    transition: all 0.3s ease;
  }

  /* 기본 상태 */
  span:nth-of-type(1) {
    top: 0;
    transform: translateY(0) rotate(0);
  }

  span:nth-of-type(2) {
    top: 50%;
    opacity: 1;
    transform: translateY(-50%);
  }

  span:nth-of-type(3) {
    top: 100%;
    transform: translateY(-100%) rotate(0);
  }

  /* .open 클래스가 추가된 상태 */
  &.open {
    span:nth-of-type(1) {
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }

    span:nth-of-type(2) {
      opacity: 0;
    }

    span:nth-of-type(3) {
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
    }
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;

export default Drawer;