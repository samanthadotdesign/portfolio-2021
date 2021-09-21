import React from 'react';
import Link from 'next/link';
import { NavHeader, NavLinks, NameLogo, NavLink } from './styles';

export default function Nav() {
	return (
		// <div className="container-fluid">
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
