import { NextLink as Link } from 'next/Link';
import styled from 'styled-components';
import { breakpoints } from '../styles/tokens';

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem .5rem;

	@media (min-width: ${breakpoints.tabletPortrait}) {
		padding: 3rem 0 3rem;
	}
`;

const Logo = styled.h1`
	font-size: 2rem;
	line-height: 1;
	margin: 0 0 .5rem 0;
	font-weight: normal;
	text-transform: lowercase;

	@media (min-width: ${breakpoints.tabletPortrait}) {
		font-size: 2.5rem;
	}
`;

const Lead = styled.h2`
	font-size: 1rem;
	line-height: 1;
	font-weight: normal;
	text-transform: lowercase;
	margin: 0;
	text-align: center;
	padding: 0 3rem;

	@media (min-width: ${breakpoints.tabletPortrait}) {
		padding: 0;
	}
`;

const Header = () => (
	<HeaderContainer>
		<Link href="/" passHref>
			<Logo>Awyisser</Logo>
		</Link>
		<Lead>Create your very own, extra special "aw yiss" comic</Lead>
	</HeaderContainer>
);

export default Header;