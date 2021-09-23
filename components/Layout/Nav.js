import React, { useContext, useRef } from 'react';
import { GlobalContext, ACTIONS } from '../../store';
import Link from 'next/link';
import useResizeObserver from 'use-resize-observer';

export default function Nav() {
	const navRef = useRef(null);
	const { windowDispatch } = useContext(GlobalContext);
	useResizeObserver({
		ref: navRef,
		onResize: ( { height } ) => {
			windowDispatch( { type: ACTIONS.SET_NAV_HEIGHT, payload: height});
		}
	});

	return (
		<div ref={navRef} className="w-100 m-0 fixed-top">
			<div className="nav-header d-flex justify-content-between " >
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
		</div>
	);
}
