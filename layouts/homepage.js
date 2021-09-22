import React from 'react';
import PostGrid from '../components/Posts/PostGrid';
import Mode from '../components/Posts/Mode';

export default function Homepage(props) {
	return (
		<div className="w-100 margin-top-80 d-flex justify-content-end">
			<div className="row">
				<div className="col">
					<Mode />
				</div>
			</div>
			<div className="row">
				<PostGrid posts={props.posts} />
			</div>
		</div>
	);
}
