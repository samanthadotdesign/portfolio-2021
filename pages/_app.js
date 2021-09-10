import Head from 'next/head';
import '../styles/globals.css';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="description" 
        content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Samantha Lee — Creative Development</title>
      </Head>
      <Component {...pageProps} />
      
    </Layout>
  );
}

export default MyApp;
