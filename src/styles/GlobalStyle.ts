import { createGlobalStyle } from 'styled-components';
import 'sanitize.css';
import { ThemeName } from './theme';

interface Props {
	themeName: ThemeName;
}

export const GlobalStyle = createGlobalStyle<Props>`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
  }
  
  a {
    text-decoration: none;
  }

  * {
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;
    user-select: none;
  }
`;
