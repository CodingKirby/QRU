import React from 'react';
import styled from 'styled-components';

const Footer = () => {
	return <FooterContainer>Footer</FooterContainer>;
};

const FooterContainer = styled.footer`
	height: 40px;
	background-color: #4db6ac;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
`;

export default Footer;
