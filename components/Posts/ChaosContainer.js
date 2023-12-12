import dynamic from "next/dynamic";

import React, { useState } from "react";

const ChaosPost = dynamic(() => import("./ChaosPost"), {
  ssr: false,
});

export default function ChaosContainer(props) {
  const { posts } = props;
  const [zIndexState, setZindexState] = useState(
    new Array(posts.length).fill(false)
  );

  const handleDrag = (index) => {
    const tempArray = [...new Array(posts.length).fill(false)];
    tempArray[index] = true;
    setZindexState(tempArray);
  };

  return (
    <>
      <div className="layout position-relative">
        {posts.map((post, index) => (
          <ChaosPost
            zIndex={zIndexState[index] ? 1 : 0}
            key={post.slug}
            post={post}
            onDrag={() => {
              handleDrag(index);
            }}
          />
        ))}
      </div>
    </>
  );
}
