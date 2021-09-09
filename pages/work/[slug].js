import PostContent from '../../components/Posts/PostDetail/PostContent';
import { getPostData, getPostFiles } from '../../lib/posts-util';

// Search friendly URL
export default function CaseStudy(props) {
  return (
    <PostContent post={props.post} />
  );
}

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);
  return {
    props: {
      post: postData,
    },
    // A single post is refreshed every 10 min when changes are made
    revalidate: 600,
  };
};

export const getStaticPaths = () => {
  const postFileNames = getPostFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
