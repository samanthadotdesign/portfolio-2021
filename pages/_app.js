import { GlobalProvider } from "../store";
import Head from "next/head";
import "../styles/globals.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "../styles/variables.scss";
import Nav from "../components/Layout/Nav";
import Footer from "../components/Layout/Footer";

function MyApp({ Component, pageProps }) {
  const isDark = false;

  return (
    <GlobalProvider>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Samantha Lee — Creative Development</title>
        <meta name="Samantha Lee" content="Creative Development" />
        <meta
          property="og:title"
          content="Samantha Lee – Creative Development"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
        ></link>
        <link rel="stylesheet" href="https://use.typekit.net/ada2lcu.css" />
        <link
          rel="preload"
          href="/fonts/EditorialNew-Regular.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/EditorialNew-Regular.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/EditorialNew-Bold.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/EditorialNew-Bold.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Regular.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Regular.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Bold.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Bold.woff"
          as="font"
          crossOrigin=""
        />

        <meta property="og:description" content="Portfolio website" />
        <meta
          property="og:image"
          content="https://samantha.design/homepage.jpg"
        />
        <meta property="og:image:alt" content="Homepage" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="https://www.samantha.design" />
        <meta
          name="theme-color"
          content="#000"
          media="(prefers-color-scheme: dark)"
        />
        <meta property="og:locale" content="en_GB" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Nav />
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
