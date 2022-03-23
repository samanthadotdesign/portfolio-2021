import PostGrid from "../components/Posts/PostGrid";
import React, { useContext, useState, useEffect } from "react";
import gsap from "gsap";
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
      <div className="homepage">
        <div className="noise">
          <div
            className="cursor bg-danger position-fixed rounded-circle d-flex justify-content-center align-items-center text-center"
            style={{
              width: cursorText ? "100px" : "10px",
              height: cursorText ? "100px" : "10px",
              padding: cursorText ? "1rem" : "0",
              transition:
                "width 150ms cubic-bezier(0.12, 0, 0.39, 0), height 150ms cubic-bezier(0.12, 0, 0.39, 0), top 200ms cubic-bezier(0.33, 1, 0.68, 1), left 200ms  cubic-bezier(0.33, 1, 0.68, 1)",
              zIndex: 999,
              top: cursorPosition.y,
              left: cursorPosition.x,
            }}
          >
            {cursorText}
          </div>

          <div
            className="position-fixed"
            style={{
              pointerEvents: "none",
              minWidth: "100vw",
              minHeight: "100vh",
              opacity: 0.4,
              transform: "translate(-50%, -50%)",
              transition:
                "top 200ms cubic-bezier(0.33, 1, 0.68, 1), left 200ms  cubic-bezier(0.33, 1, 0.68, 1) ",
              background:
                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,250,0,1) 20%, rgba(229,0,255,0) 40%)",
              backgroundSize: "50% 50%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              top: cursorPosition.y,
              left: cursorPosition.x,
            }}
          ></div>

          <div
            className="homepage-div"
            style={{ paddingTop: `${nav.height}px` }}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="px-0">
                  <PostGrid posts={props.posts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
