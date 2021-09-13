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

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};
