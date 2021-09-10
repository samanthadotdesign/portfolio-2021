import { getFeaturedPosts } from '../lib/posts-util';
import Hero from '../components/Homepage/Hero';
import Featured from '../components/Homepage/Featured';
import Footer from '../components/Layout/Footer';

export default function Home(props) {
  return (
    <div>
      <main>
        <Hero />
        <Featured posts={props.posts} />
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
  };
};
