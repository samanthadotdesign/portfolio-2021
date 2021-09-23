import React, { useContext } from 'react';
import { GlobalContext } from '../store';
import Link from 'next/link';

export default function About() {
	const { windowStoreState } = useContext(GlobalContext);
	const { nav } = windowStoreState;

	return (
		<div className="homepage-div" style={{paddingTop:`${nav.height}px`}}>
			<div className="container-fluid margin-top-60">
				<div className="row">
					<div className="col-md-8 px-0">
						<h1>
						Hi! I'm a multidisciplinary designer based in Singapore. Lately I've been designing with code to ship beautiful things.  
						</h1>
					</div>
				</div>
				<div className="row margin-top-16">
					<div className="col-md-6 px-0">
						<h3>
						I'm currently a Lead Product Designer at Funding Societies, where I work on experiences to bring equitable access to business financing. 
						</h3>
					</div>
					<div className="col-md-6 px-0 d-flex flex-column align-items-end">
						<Link href="https://pumped-ferret-02a.notion.site/Samantha-Lee-Design-Development-45c56da843bf454db36fe0ed94b83e29">
							<a className="btn-link">RESUMÉ</a>
						</Link>
						<Link href="https://www.linkedin.com/in/samanthadotdesign/">
							<a className="btn-link">LINKEDIN</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
