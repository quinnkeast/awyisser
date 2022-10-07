import { withRouter, useRouter } from "next/router";
import Link from "next/Link";
import { useEffect } from "react";
import Head from 'next/head';
import Layout from '../components/layout';

function Comic(props) {
	const router = useRouter();
	
	useEffect(() => {
		// Check if there's a comic to display
		if (!props.router.query.image) {
			router.push('/');
		}
	}, []);

	return (
		<Layout>
			<Head>
				<title>Aw yiss new comic | Awyisser</title>
			</Head>
			<div className="flex flex-col items-center">
				<img src={props.router.query.image} id="image" className="max-w-full" />
				<p className="text-xs font-sans text-gray-500 mb-6">Copy and paste anywhere. Image is not saved.</p>
				{/*<CopyButton onClick={this.handleCopyImage} className={copied ? 'copied' : ''} disabled={copied}>
					{!copied && <><CopyIcon icon={faCopy} /> Copy image to share</>}
					{copied && <><CopyIcon icon={faCheckCircle} /> Copied! Next, paste it anywhere</>}
				</CopyButton>*/}
				<Link href="/">
					<button className="lowercase bg-blue-600 text-white px-4 py-1 border-1 rounded hover:bg-blue-500 focus:outline-4 focus:outline-offset-2">Rad! Make another comic</button>
				</Link>
			</div>
		</Layout>
	);
}


export default withRouter(Comic);
