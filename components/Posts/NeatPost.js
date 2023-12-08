import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LoopingVideo from "../PostDetail/LoopingVideo";

export default function NeatPost(props) {
  const { post } = props;
  const { slug, frontMatter, mdxSource } = post;
  const [isHover, setIsHover] = useState(false);
  const { title, media, mask, color } = frontMatter;
  const postItemRef = useRef(null);
  const mediaPath = `/images/work/${slug}/${media}`;
  const linkPath = `/work/${slug}`;
  const router = useRouter();
  const goToLink = () => {
    router.push(linkPath);
  };

  return (
    <div
      className={`d-flex flex-column justify-content-center hovered-card`}
      // ${
      //   isHover && "hovered-card"
      // }`}
      onTouchStart={goToLink}
      onClick={goToLink}
      // onMouseEnter={setIsHover(true)}
      // onMouseLeave={setIsHover(false)}
    >
      <div className="neat-view-img"></div>
      <div className="d-flex flex-row">
        <div
          style={{
            backgroundColor: `${color}`,
            maskImage: `url("/images/site/${mask}")`,
            WebkitMaskImage: `url("/images/site/${mask}")`,
          }}
          className="masked neat-view-icon"
          mediaPath={mediaPath}
        ></div>
        <p className="m-0 align-self-center">{title}</p>
      </div>
    </div>
  );
}
