import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../store";
import Link from "next/link";

export default function About() {
  const { windowStoreState } = useContext(GlobalContext);
  const { nav } = windowStoreState;

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
    <div className="about">
      <div className="noise">
        <div
          className="cursor position-fixed rounded-circle d-flex justify-content-center align-items-center text-center"
          style={{
            width: "10px",
            height: "10px",
            padding: "0",
            transition:
              "width 150ms cubic-bezier(0.22, 1, 0.36, 1), height 150ms cubic-bezier(0.22, 1, 0.36, 1), top 200ms cubic-bezier(0.22, 1, 0.36, 1), left 200ms  cubic-bezier(0.22, 1, 0.36, 1)",
            zIndex: 999,
            top: cursorPosition.y,
            left: cursorPosition.x,
          }}
        ></div>

        <div
          className="container-fluid"
          style={{ paddingTop: `${nav.height}px` }}
        >
          <div className="row nav-header">
            <div className="col-md-7 px-0">
              <h1>
                I'm a multidisciplinary designer &#38; developer in Singapore.
              </h1>
            </div>
          </div>
          <div className="d-flex row justify-content-between py-5 nav-header">
            <div className="col-md-5 px-0">
              <h3 className="py-0">
                I'm currently a Lead Product Designer at Funding Societies,
                where I work on experiences to bring equitable access to
                business financing.
              </h3>
            </div>
            <div className="col-md-6 px-0 d-flex flex-column align-items-end">
              <Link href="https://drive.google.com/file/d/1PMewfaXZA1bQmY1impGRH9u3gWpqgVlC/view?usp=sharing">
                <a className="btn-link">RESUMÉ</a>
              </Link>
              <Link href="https://www.github.com/samanthadotdesign/">
                <a className="btn-link">GITHUB</a>
              </Link>
              <Link href="https://www.linkedin.com/in/samanthadotdesign/">
                <a className="btn-link">LINKEDIN</a>
              </Link>
              <Link href="mailto:hi@samantha.design">
                <a className="btn-link">EMAIL</a>
              </Link>
            </div>
          </div>
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
              "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(162,179,133,0.1) 30%, rgba(162,179,133,0) 55%)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            top: cursorPosition.y,
            left: cursorPosition.x,
          }}
        ></div>
      </div>
    </div>
  );
}
