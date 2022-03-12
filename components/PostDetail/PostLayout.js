import React from "react";

export default function PostLayout({ children }) {
  return (
    <div className="container-fluid d-flex flex-column">
      <div className="row">
        <div className="col-md-5 px-0">{children}</div>
      </div>
    </div>
  );
}
