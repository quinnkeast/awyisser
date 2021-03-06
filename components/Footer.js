import styled from 'styled-components';
import { breakpoints } from '../styles/tokens';

const FooterContainer = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem .5rem;

	@media (min-width: ${breakpoints.tabletPortrait}) {
	  padding: 3rem 0;
	}

	p {
		font-size: .95rem;
		text-transform: lowercase;
		margin: 0;
		text-align: center;
	}
`;

const Footer = () => (
	<FooterContainer>
		<p>Made by <a href="https://twitter.com/quinnkeast" target="_blank">@quinnkeast</a> because it didn't exist while watching Mean Girls the other night</p>
		<p>With love and admiration for Kate Beaton's <a href="http://www.harkavagrant.com/">"Hark! A Vagrant"</a></p>
	</FooterContainer>
);

export default Footer;