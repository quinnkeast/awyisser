import Head from "next/head";
import Script from "next/script";

export default function Meta() {
  return (
    <Head>
      <Script
        src="https://rudolph-luminous.awyisser.com/script.js"
        site={process.env.FATHOM}
        defer
      ></Script>
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <title>awyisser | aw yiss comic generator</title>
      <meta
        property="og:description"
        content="Make your very own bespoke extra special aw yiss comic."
        key="description"
      />
      <meta property="og:title" content="Awyisser" key="title" />
      <meta property="og:url" content="https://awyisser.com/" key="url" />
      <meta property="og:type" content="website" key="type" />
      <meta property="og:image" content="https://awyisser.com/thumbnail.png" key="image" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="https://awyisser.com" />
      <meta property="twitter:creator" content="@quinnkeast" />
      <meta property="twitter:title" content="Awyisser" key="twitter-title" />
      <meta
        property="twitter:description"
        content="Make your very own bespoke extra special aw yiss comic."
        key="twitter-description"
      />
      <meta
        property="twitter:image"
        content="https://awyisser.com/thumbnail.png"
        key="twitter-image"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
