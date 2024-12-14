import QRULogoCard from '../components/home/QRULogoCard';
import styled from 'styled-components';

function Home() {
	return (
		<HomeStyle>
			<QRULogoCard />
		</HomeStyle>
	);
}

const HomeStyle = styled.div`
	.home-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
`;

export default Home;
