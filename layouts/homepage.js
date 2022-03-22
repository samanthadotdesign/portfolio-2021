import PostGrid from "../components/Posts/PostGrid";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../store";

export default function Homepage(props) {
  const { windowStoreState, layoutStoreState } = useContext(GlobalContext);
  const { nav } = windowStoreState;
  const { cursorText } = layoutStoreState;

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMovement = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handleMovement);
    return () => {
      window.removeEventListener("pointermove", handleMovement);
    };
  }, []);

  return (
    <>
      <div
        className="bg-danger position-fixed"
        style={{
          width: "100px",
          minHeight: "40px",
          transition: "opacity 300ms linear",
          opacity: cursorText == "" ? 0 : 1,
          zIndex: 999,
          top: cursorPosition.y,
          left: cursorPosition.x + 10,
        }}
      >
        {cursorText}
      </div>
      <div className="homepage-div" style={{ paddingTop: `${nav.height}px` }}>
        <div className="container-fluid">
          <div className="row">
            <div className="px-0">
              <PostGrid posts={props.posts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
