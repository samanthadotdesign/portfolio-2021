import PostGrid from "../../components/Posts/PostGrid";
import Mode from "../../components/Posts/Mode";
import { getAllPosts } from "../../lib/getPostData";

// All case studies page
export default function AllWork(props) {
  return (
    <>
      <h1>Work</h1>
      <Mode />
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
