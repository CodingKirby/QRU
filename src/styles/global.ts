import { createGlobalStyle } from 'styled-components';
import 'sanitize.css';

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;
    background: linear-gradient(135deg, #a8edea, #fed6e3);
  }

  h1 {
    margin: 0;
  }
`;
