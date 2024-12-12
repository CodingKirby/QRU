import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import Footer from '../common/Footer';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Container>
			<Header />
			<Main>
				<Content>{children}</Content>
			</Main>
			<Footer />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const Main = styled.div`
	display: flex;
	flex: 1;
`;

const Content = styled.main`
	flex: 1;
	padding: 1rem;
	overflow-y: auto;
`;

export default Layout;
