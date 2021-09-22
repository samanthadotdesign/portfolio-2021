import React from 'react';
import Link from 'next/link';
import { NavLinks, NameLogo, NavLink } from './styles';

export default function Nav() {
	return (
		// <div className="container-fluid">
		<>
			<div className="nav-header w-100 d-flex justify-content-between m-0">
				<Link href="/">
					<NameLogo>SAMANTHA LEE</NameLogo>
				</Link>
				<div className='d-flex m-0'>
					<Link href="/">
						<NavLink>WORK</NavLink>
					</Link>
					<Link href="/about">
						<NavLink>ABOUT</NavLink>
					</Link>
				</div>
			</div>
		</>
	);
}
