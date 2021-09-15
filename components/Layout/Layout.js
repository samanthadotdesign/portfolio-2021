import Nav from './Nav';

export default function Layout(props) {
	return (
		<>
			<Nav />
			<main>{props.children}</main>
		</>
	);
}
