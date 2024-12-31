import { createGlobalStyle } from "styled-components";
import "sanitize.css";
import { ThemeName } from "./theme";
import Pretendard from "../assets/fonts/Pretendard.woff2";

interface Props {
  themeName: ThemeName;
}

export const GlobalStyle = createGlobalStyle<Props>`
  @font-face {
    font-family: 'Pretendard';
    src: local('Pretendard'), url(${Pretendard}) format('woff2');
    font-weight: normal;
  }

  html,body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};

    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  h {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  * {
    font-family: 'Poppins', 'Noto Sans KR', 'Pretendard', sans-serif;
    user-select: none;
    -webkit-user-select: none; /* 사파리 호환 */
    -ms-user-select: none; /* 옛날 IE 호환 */
    -moz-user-select: none; /* 파이어폭스 호환 */
  }
`;
