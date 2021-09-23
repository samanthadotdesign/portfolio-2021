import React from 'react';

export default function FullWidthContainer({children}) {
	return (
		<div className="mw-100 margin-top-36 override-toc">
			{children}
		</div>
	);
}