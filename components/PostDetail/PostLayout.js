import React from 'react';

export default function PostLayout({children}) {
	return (
		<div className="container-fluid d-flex flex-column margin-top-36">
			<div className="row">
				<div className="col-md-6 px-0">
					{children}
				</div>
			</div>
		</div>
	);
}
