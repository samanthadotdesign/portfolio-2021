import React, { useContext, useRef, useEffect, useState } from "react";
import { GlobalContext, ACTIONS } from "../../store";
import Link from "next/link";
import useResizeObserver from "use-resize-observer";
import Mode from "../Posts/Mode";
import { useRouter } from "next/router";

export default function Nav() {
  const navRef = useRef(null);
  const { windowDispatch } = useContext(GlobalContext);
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Getting the height of the nav
  useResizeObserver({
    ref: navRef,
    onResize: ({ height }) => {
      windowDispatch({ type: ACTIONS.SET_NAV_HEIGHT, payload: height });
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    windowDispatch({
      type: ACTIONS.SET_WINDOW_SIZE,
      payload: {
        width: windowWidth,
        height: window.innerHeight,
      },
    });
  }, [windowWidth]);

  return (
    <div ref={navRef} className="w-100 m-0 fixed-top">
      <div className="nav-header d-flex justify-content-between">
        <Link href="/">
          <a className="nav-logo">SAMANTHA LEE</a>
        </Link>
        <div className="d-flex m-0">
          {windowWidth > 600 && router.pathname == "/" && <Mode />}
          <Link href="/">
            <a className="nav-link">WORK</a>
          </Link>
          <Link href="/about">
            <a className="nav-link">ABOUT</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
