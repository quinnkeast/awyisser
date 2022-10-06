import { withRouter, useRouter } from "next/router";
import Link from "next/Link";
import { useEffect } from "react";
import Head from 'next/head';
import Layout from '../components/layout';
import styled from 'styled-components';

const Notice = styled.p`
	font-family: Arial, Helvetica, sans-serif;
	color: #999;
	font-size: .7rem;
	line-height: 1.25;
	text-align: center;
	margin: 0 0 1.5rem;
	letter-spacing: .125px;
`;

const RestartButton = styled.button`
	background-color: #6772e5;
	color: #fff;
	font-size: 1rem;
	line-height: 1;
	text-transform: lowercase;
	border-radius: 6px;
	border: none;
	padding: .5rem 1rem;
	transition: all 50ms ease;
	font-weight: 400;

	&:hover {
		background-color: #7795f8;
		cursor: pointer;
	}
`;

function Comic(props) {
	const router = useRouter();
	
	useEffect(() => {
		// check if there's a comic

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
				<Notice>Copy and paste anywhere. Image is not saved.</Notice>
				{/*<CopyButton onClick={this.handleCopyImage} className={copied ? 'copied' : ''} disabled={copied}>
					{!copied && <><CopyIcon icon={faCopy} /> Copy image to share</>}
					{copied && <><CopyIcon icon={faCheckCircle} /> Copied! Next, paste it anywhere</>}
				</CopyButton>*/}
				<Link href="/">Rad! Make another comic</Link>
			</div>
		</Layout>
	);
}


export default withRouter(Comic);