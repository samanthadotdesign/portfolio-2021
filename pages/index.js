import { getFeaturedPosts } from '../lib/posts-util';
import Homepage from '../layouts/homepage';
import Footer from '../components/Layout/Footer';

export default function Home(props) {
	return (
		<div>
			<main>
				<Homepage posts={props.posts} />
			</main>
			<Footer />
		</div>
	);
}

export const getStaticProps = async () => {
	const featuredPosts = await getFeaturedPosts();
	return {
		props: {
			posts: featuredPosts,
		},
	};
};
