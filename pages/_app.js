import Head from 'next/head';
import '../styles/globals.css';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
	const isDark = false;

	return (
		<Layout className={isDark ? 'dark-mode' : 'light-mode'}>
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
