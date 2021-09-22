import React from 'react';
import Image from 'next/image';

export default function About() {
	return (
		<div className="w-100 about-div">
			<div className="row">
				<div className="col-sm-8 col-sm-4">
					<h1>
						I'm a multidisciplinary designer based in Singapore. Lately I've been designing with code to ship beautiful things.  
					</h1>
				</div>
			</div>
			<div className="row margin-top-16">
				<div className="col-sm-6 col-sm-4 ">
					<h3>
						I'm currently a Lead Product Designer at Funding Societies, where I work on experiences to bring equitable access to business financing. 
					</h3>
				</div>
			</div>
		</div>
	);
}
