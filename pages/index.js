import Head from 'next/head';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from '../components/Form';
import { breakpoints } from '../styles/tokens';

const Main = styled.main`
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: ${breakpoints.tabletPortrait}) {
    max-width: 1200px;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>awyisser | aw yiss comic generator</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Main>
        <Header />
        <Form />
        <Footer />
      </Main>        

      <style jsx global>{`
        @font-face {
            font-family: 'BeatonScript';
            src: url('/fonts/katebeatonscript-regular-webfont.eot');
            src: url('/fonts/katebeatonscript-regular-webfont.eot?#iefix') format('embedded-opentype'),
                 url('/fonts/katebeatonscript-regular-webfont.woff') format('woff'),
                 url('/fonts/katebeatonscript-regular-webfont.ttf') format('truetype'),
                 url('/fonts/katebeatonscript-regular-webfont.svg#kate_beaton_script_regular') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        html {
          font-size: 18px;
        }

        body {
          font-family: 'BeatonScript', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      `}</style>
    </>
  )
}
