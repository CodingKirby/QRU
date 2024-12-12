import React from 'react';
import QRULogoCard from '../components/home/QRULogoCard';
import Button from '../components/common/Button';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

const Home: React.FC = () => {
	const handleCreateCard = () => {
		alert('명함 만들기 버튼 클릭!');
	};

	return (
		<HomeStyle>
			<div className="home-container">
				<QRULogoCard>
					<Button onClick={handleCreateCard} icon={<FaPlus />}>
						나만의 명함 만들러 가기
					</Button>
				</QRULogoCard>
			</div>
		</HomeStyle>
	);
};

const HomeStyle = styled.div`
	.home-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		gap: 2rem;
		flex-direction: column;
	}
`;

export default Home;
