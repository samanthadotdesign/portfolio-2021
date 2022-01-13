import React from 'react';

export default function LoopingVideo(props) {
	return (
		// trigger play and stop based on the state (loop or no loop)
		<video className="mw-100 rounded-edges" {...props} autoPlay muted loop >
		</video>
	);
}
