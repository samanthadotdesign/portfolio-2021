import React from 'react';
import PostGrid from '../components/Posts/PostGrid';
import Mode from '../components/Posts/Mode';
import Footer from '../components/Layout/Footer';

export default function Homepage(props) {
	return (
		<div className="container-fluid" >
			<div className="row">
				<div className="col-sm-8 col-sm-4">
					<h1>
						Samantha is a multidisciplinary designer based in Singapore.
					</h1>
				</div>
				<div className="col-sm-4">
					<Mode />
				</div>
			</div>
			<div className="row">
				<PostGrid posts={props.posts} />
			</div>
			<div className="row">
				<Footer/>
			</div>
		</div>
	);
}
