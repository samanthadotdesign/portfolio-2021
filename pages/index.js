import React from "react";
import { getFeaturedPosts } from "../lib/getPostData";
import Homepage from "../layouts/homepage";

export default function Home(props) {
  return <Homepage posts={props.posts} />;
}

export const getStaticProps = async () => {
  const featuredPosts = await getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
  };
};
