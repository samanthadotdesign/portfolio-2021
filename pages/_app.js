import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Samantha Lee — Creative Development</title>
        <meta name="description" 
        content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
