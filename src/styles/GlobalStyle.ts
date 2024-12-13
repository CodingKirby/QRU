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
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;
    background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  a {
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.color.third};
    }
  }

  * {
    user-select: none;
  }
`;
