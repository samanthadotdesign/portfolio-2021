import React from 'react';

export default function TwoColumn(props) {
	const [ left, right ] = props;

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm">
					{left}
				</div>
				<div className="col-sm">
					{right}
				</div>
			</div>
		</div>
	);
}
