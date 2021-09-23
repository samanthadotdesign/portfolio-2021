import React from 'react';
import PostGrid from '../components/Posts/PostGrid';
import Mode from '../components/Posts/Mode';

export default function Homepage(props) {
	return (
		<>
			<div className="container-fluid margin-top-100 toggle-div">
				<div className="row">
					<Mode/>
				</div>
			</div>

			<div className="container-fluid margin-top-100 ">
				<div className="row">
					<div className="px-0">
						<PostGrid posts={props.posts} />
					</div>
				</div>
			</div>
		</>
	);
}
