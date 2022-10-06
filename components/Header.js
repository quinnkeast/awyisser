import styled from 'styled-components';
import Link from 'next/Link';

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem .5rem;
`;

const Logo = styled.h1`
	font-size: 2rem;
	line-height: 1;
	margin: 0 0 .5rem 0;
	font-weight: normal;
	text-transform: lowercase;
`;

const Lead = styled.h2`
	font-size: 1rem;
	line-height: 1;
	font-weight: normal;
	text-transform: lowercase;
	margin: 0;
	text-align: center;
	padding: 0 3rem;
`;

const Header = () => (
	<HeaderContainer>
		<Logo>
		<Link href="/">
			Awyisser
		</Link>
		</Logo>
		<Lead>Create your very own, extra special "aw yiss" comic</Lead>
	</HeaderContainer>
);

export default Header;