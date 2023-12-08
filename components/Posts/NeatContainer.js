import React, { useState } from "react";
import NeatPost from "./NeatPost";

export default function NeatContainer(props) {
  const { posts } = props;

  return (
    <>
      <div className="neat-grid w-100">
        {posts.map((post, index) => (
          <NeatPost key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
