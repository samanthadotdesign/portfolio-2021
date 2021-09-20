import React from 'react';
import Image from 'next/image';

export default function About() {
	return ( <
		section >
		<
			div >
			 <
				Image src = "/images/site/xp.jpeg"
				alt = "test image"
				// Layout prop can be used to scale responsively
				width = {
					600
				}
				height = {
					375
				}
				layout = "responsive" /
			>
		<
		/div> <
	/section>
	);
}
