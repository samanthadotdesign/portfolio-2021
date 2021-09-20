import PostGrid from '../../components/Posts/PostGrid';
import { getAllPosts } from '../../lib/posts-util';
// All case studies page
export default function AllWork(props) {
	return (
		<>
			<h1>Work</h1>
			<PostGrid posts={props.posts} />
		</>
	);
}

export const getStaticProps = async () => {
	const allPosts = await getAllPosts();
	return {
		props: {
			posts: allPosts,
		},
	};
};
