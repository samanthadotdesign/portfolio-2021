import React from 'react';

export default function LoopingVideo(props) {
	return (
		<video className="mw-100 rounded-edges" autoPlay muted loop {...props}>
		</video>
	);
}
