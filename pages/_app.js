import { GlobalProvider } from '../store';
import Head from 'next/head';
import '../styles/globals.css';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

import '../styles/variables.scss';
//import '../node_modules/bootstrap/scss/bootstrap.scss';
import Nav from '../components/Layout/Nav';
import Footer from '../components/Layout/Footer';

function MyApp({ Component, pageProps }) {
	const isDark = false;

	return (
		<GlobalProvider>
			<Head>
				<title>Samantha Lee — Creative Development</title>
				<meta name="description" 
					content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
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

			</Head>
			<Nav/>
			<Component {...pageProps} />
			<Footer/>
		</GlobalProvider>
	);
}

export default MyApp;
