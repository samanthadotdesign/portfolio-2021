import React from 'react';
import Link from 'next/link';

export default function Nav() {
	return (
		<>
			<div className="nav-header w-100 d-flex justify-content-between m-0 fixed-top">
				<Link href="/">
					<a className="nav-logo">SAMANTHA LEE</a>
				</Link>
				<div className='d-flex m-0'>
					<Link href="/">
						<a className="nav-link">WORK</a>
					</Link>
					<Link href="/about">
						<a className="nav-link">ABOUT</a>
					</Link>
				</div>
			</div>
		</>
	);
}
