import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
	return (
		<FooterContainer>
			<Logo>QRU</Logo>
			<FooterMenu>
				<FooterLink href="#">About</FooterLink>
				<FooterLink href="#">Privacy Policy</FooterLink>
				<FooterLink href="#">Terms of Service</FooterLink>
				<FooterLink href="#">Contact</FooterLink>
			</FooterMenu>
			<SocialIcons>
				<SocialIcon href="https://github.com/CodingKirby/QRU" target="_blank" rel="noopener noreferrer">
					<FaGithub />
				</SocialIcon>
			</SocialIcons>
			<Copyright>© 2024 QRU. All Rights Reserved.</Copyright>
		</FooterContainer>
	);
};

const FooterContainer = styled.footer`
	background-color: ${({ theme }) => theme.color.blur};
	padding: 1rem;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
`;

const FooterMenu = styled.div`
	display: flex;
	gap: 1rem;
`;

const FooterLink = styled.a`
	color: white;
	text-decoration: none;
	font-size: 0.9rem;

	&:hover {
		color: ${({ theme }) => theme.color.onText};
	}
`;

const SocialIcons = styled.div`
	display: flex;
	gap: 1rem;
`;

const SocialIcon = styled.a`
	color: white;
	font-size: 1.5rem;
	transition: color 0.3s;

	&:hover {
		color: ${({ theme }) => theme.color.onText};
	}
`;

const Copyright = styled.div`
	font-size: 0.8rem;
	text-align: center;
`;

export default Footer;
