import AllPosts from '../../components/Posts/AllPosts';
import { getAllPosts } from '../../lib/posts-util';
// All case studies page
export default function AllWork(props) {
	return (
		<>
			<AllPosts posts={props.posts} />
		</>
	);
}

export const getStaticProps = async () => {
	const allPosts = await getAllPosts();
	console.log('******** ALL POSTS INSIDE INDEX.JS*****');
	console.log(allPosts);
	return {
		props: {
			posts: allPosts,
		},
	};
};
