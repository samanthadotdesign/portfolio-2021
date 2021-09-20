import PostGrid from '../components/Posts/PostGrid';

export default function Featured(props) {
	return (
		<section>
			<h1>Samantha is a multidisciplinary designer based in Singapore.</h1>
			<PostGrid posts={props.posts} />
		</section>
	);
}
