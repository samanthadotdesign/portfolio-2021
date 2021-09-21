import React from 'react';

export default function LoopingVideo(props) {
	return (
		<video autoPlay muted loop {...props}>
		</video>
	);
}
