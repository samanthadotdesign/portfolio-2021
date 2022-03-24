import React, { useContext } from "react";
import { GlobalContext } from "../store";
import Link from "next/link";

export default function About() {
  const { windowStoreState } = useContext(GlobalContext);
  const { nav } = windowStoreState;

  return (
    <div className="about">
      <div className="noise">
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
              <Link href="https://drive.google.com/file/d/1wpKCwZ5M2epIOsqhRKC3Q18DPUHto2SJ/view?usp=sharing">
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
      </div>
    </div>
  );
}
