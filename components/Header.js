import Link from 'next/Link';
import styled from 'styled-components';

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3rem 0 3rem;
`;

const Logo = styled.h1`
	font-size: 2.5rem;
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