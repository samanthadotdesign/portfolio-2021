import Link from 'next/link';
import { NavHeader, NavLinks, NameLogo, NavLink } from './styles';
import React from 'react';

export default function Nav() {
	return (
		<>
			<NavHeader>
				<Link href="/">
					<NameLogo>SAMANTHA LEE</NameLogo>
				</Link>
				<NavLinks>
					<Link href="/work">
						<NavLink>WORK</NavLink>
					</Link>
					<Link href="/about">
						<NavLink>ABOUT</NavLink>
					</Link>
				</NavLinks>
			</NavHeader>
		</>
	);
}
