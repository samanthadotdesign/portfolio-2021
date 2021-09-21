import { GlobalProvider } from '../store';
import Head from 'next/head';
import '../styles/globals.css';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import Layout from '../components/Layout/Layout';
import '../node_modules/bootstrap/scss/bootstrap.scss';

function MyApp({ Component, pageProps }) {
	const isDark = false;

	return (
		<GlobalProvider>
			<Layout className={isDark ? 'dark-mode' : 'light-mode'}>
				<Head>
					<title>Samantha Lee — Creative Development</title>
					<meta name="description" 
						content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="stylesheet" href="https://use.typekit.net/ada2lcu.css"></link>
				</Head>
				<Component {...pageProps} />
			</Layout>
		</GlobalProvider>
	);
}

export default MyApp;
