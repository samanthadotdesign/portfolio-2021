import PostGrid from "../components/Posts/PostGrid";
import React, { useContext } from "react";
import { GlobalContext } from "../store";

export default function Homepage(props) {
  const { windowStoreState } = useContext(GlobalContext);
  const { nav } = windowStoreState;

  return (
    <div className="homepage-div" style={{ paddingTop: `${nav.height}px` }}>
      <div className="container-fluid">
        <div className="row">
          <div className="px-0">
            <PostGrid posts={props.posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
