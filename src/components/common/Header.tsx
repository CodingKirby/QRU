import React from 'react';
import styled from 'styled-components';

const Header = () => {
	return <HeaderContainer>Header</HeaderContainer>;
};

const HeaderContainer = styled.header`
	height: 60px;
	background-color: #4db6ac;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export default Header;
