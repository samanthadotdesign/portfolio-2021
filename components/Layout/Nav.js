import Link from 'next/link';
import Mode from '../Homepage/Mode';
import { NavHeader, NavLinks } from './styles';

export default function Nav() {
	return (
		<>
			<NavHeader>
				<Link href="/">
					<a>
						<h3>Samantha Lee</h3>
					</a>
				</Link>
				<NavLinks>
					<Link href="/work">Work</Link>
					<Link href="/about">About</Link>
					<Mode/>
				</NavLinks>
			</NavHeader>
		</>
	);
}
