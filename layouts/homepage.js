import React from 'react';
import PostGrid from '../components/Posts/PostGrid';
import Mode from '../components/Posts/Mode';

export default function Homepage(props) {
	return (
		<>
			<div className="w-100 d-flex justify-content-end margin-top-100 toggle-div">
				<div className="row">
					<Mode/>
				</div>
			</div>

			<div className="w-100 margin-top-100">
				<div className="row">
					<PostGrid posts={props.posts} />
				</div>
			</div>
		</>
	);
}
