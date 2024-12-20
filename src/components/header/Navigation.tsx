import Dropdown from "../common/Dropdown";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { NAVIGATION } from "../../data/NavigationItems";

function Navigation() {
  return (
    <NavigationStyle className="navigation">
      <ul>
        {NAVIGATION.map((item, index) => (
          <li key={index}>
            <Link to={item.link}>{item.title}</Link>
            {item.subItems && (
              <Dropdown>
                {item.subItems.map((subItem, subIndex) => (
                  <Link to={subItem.link} key={subIndex} className="item">
                    {subItem.title}
                  </Link>
                ))}
              </Dropdown>
            )}
          </li>
        ))}
      </ul>
    </NavigationStyle>
  );
}

const NavigationStyle = styled.nav`
  ul {
    display: flex;
    gap: 1.5rem;
    white-space: nowrap;

    li {
      position: relative;

      a {
        font-size: ${({ theme }) => theme.fontSize.medium};
        font-weight: 500;
        color: ${({ theme }) => theme.color.text};
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: ${({ theme }) => theme.color.primary};

          > .panel {
            visibility: visible;
            transform: scaleY(1);
            opacity: 1;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }

          > a {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }

    .panel {
      visibility: hidden;
      display: flex;
      flex-direction: column;

      position: absolute;
      top: 100%;
      margin-top: 1rem;
      padding: 1rem 1.2rem;
      line-height: 2;

      background: ${({ theme }) => theme.color.surface};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      box-shadow: ${({ theme }) => theme.shadow.default};

      transform-origin: top;
      transform: scaleY(0);
      opacity: 0;

      .item {
        font-size: ${({ theme }) => theme.fontSize.medium};
        color: ${({ theme }) => theme.color.text};
        text-decoration: none;
        transition: color 0.3s ease;
        border-radius: ${({ theme }) => theme.borderRadius.default};
        padding: 0.3rem 1rem;

        &:hover {
          color: ${({ theme }) => theme.color.primary};
          background: ${({ theme }) => theme.color.secondary};
          box-shadow: ${({ theme }) => theme.shadow.default};
        }
      }

      /* 화살표 */
      &:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0.5rem;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-bottom: 0.5rem solid ${({ theme }) => theme.color.surface};
        top: -0.5rem;
        left: 2rem;
      }

      &:after {
        content: "";
        position: absolute;
        top: -1rem;
        left: 0;
        width: 100%;
        height: 2rem;
        background: none;
      }
    }

    &:hover .panel {
      visibility: visible;
      transform: scaleY(1);
      opacity: 1;
      transition: transform 0.5s ease, opacity 0.3s ease;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Navigation;