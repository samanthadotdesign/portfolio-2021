import React from 'react'
// import PostGrid from '../Posts/PostGrid';
import dynamic from 'next/dynamic'
const PostGrid = dynamic(
  () => import('../Posts/PostGrid'),
  { ssr: false }
)

export default function Featured(props) {
  return (
    <section>
      <PostGrid posts={props.posts}/>
    </section>
  );
}
