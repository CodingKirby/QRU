import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;
    background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.color.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
