import styled from 'styled-components';
import Header from '../common/Header';
import Footer from '../common/Footer';

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
	min-height: 100vh; /* 브라우저 창 전체를 채우기 */
`;

const Content = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	margin: 0 auto;
	max-width: ${({ theme }) => theme.layout.width.large};
	padding: 20px 0;

	@media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
		padding: 20px 12px;
	}
`;

export default Layout;
