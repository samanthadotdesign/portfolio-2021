import PostGrid from '../components/Posts/PostGrid';
import Mode from '../components/Posts/Mode';

export default function Featured(props) {
	return (
		<section>
			<h1>Samantha is a multidisciplinary designer based in Singapore.</h1>
			<Mode />
			<PostGrid posts={props.posts} />
		</section>
	);
}
