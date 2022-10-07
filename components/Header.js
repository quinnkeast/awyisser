import Link from 'next/Link';

const Header = () => (
  <div className="container mx-auto px-4 xl:max-w-screen-xl mt-12 mb-8">
		<div className="flex flex-col items-center text-center">
			<Link href="/">
				<a className="hover:text-blue-600 hover:cursor-pointer">
					<h1 className="text-6xl leading-none margin-0 text-center mb-2 lowercase">Awyisser</h1>
				</a>
			</Link>
			<h2 className="text-lg lowercase leading-none">Create your very own, extra special "aw yiss" comic</h2>
		</div>
	</div>
);

export default Header;
