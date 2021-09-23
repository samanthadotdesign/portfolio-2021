import React from 'react';

export default function LoopingVideoMobile(props) {
	return (
		<video className="max-height-50 rounded-edges" {...props} autoPlay muted loop >
		</video>
	);
}
