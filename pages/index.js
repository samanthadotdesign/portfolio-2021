import { getFeaturedPosts } from '../lib/posts-util';
import Featured from '../components/Homepage/Featured';
import Footer from '../components/Layout/Footer';
import React from 'react';


export default function Home(props) {  
  return (
    <div>
      <main>
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
