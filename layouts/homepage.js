import ChaosContainer from "../components/Posts/ChaosContainer";
import NeatContainer from "../components/Posts/NeatContainer";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../store";

export default function Homepage(props) {
  const { windowStoreState, layoutStoreState } = useContext(GlobalContext);
  const { nav } = windowStoreState;
  const { cursorText, isMessy } = layoutStoreState;
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
        className="homepage"
        style={{ overflow: isMessy ? "hidden" : "scroll" }}
      >
        <div className={`${isMessy ? "noise-messy" : "noise-neat"}`}>
          <div
            className="cursor position-fixed rounded-circle d-flex justify-content-center align-items-center text-center"
            style={{
              width: cursorText ? "100px" : "10px",
              height: cursorText ? "100px" : "10px",
              padding: cursorText ? "1rem" : "0",
              transition:
                "width 150ms cubic-bezier(0.22, 1, 0.36, 1), height 150ms cubic-bezier(0.22, 1, 0.36, 1), top 200ms cubic-bezier(0.22, 1, 0.36, 1), left 200ms  cubic-bezier(0.22, 1, 0.36, 1)",
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
              transform: "translate(-50%, -50%)",
              transition:
                "top 200ms cubic-bezier(0.22, 1, 0.36, 1), left 200ms  cubic-bezier(0.22, 1, 0.36, 1) ",
              background:
                "radial-gradient(circle, rgba(229,169,159,0.6) 0%, rgba(162,179,133,0.4) 20%, rgba(162,179,133,0) 50%)",
              backgroundSize: "100% 100%",
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
                  {isMessy ? (
                    <ChaosContainer posts={props.posts} />
                  ) : (
                    <NeatContainer posts={props.posts} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
