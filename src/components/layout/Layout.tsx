import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <LayoutStyle>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </LayoutStyle>
  );
}

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 4rem 2rem;
  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 4rem 1rem;
  }
`;

export default Layout;
