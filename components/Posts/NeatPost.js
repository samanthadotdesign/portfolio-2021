import React, { useRef, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LoopingVideo from "../PostDetail/LoopingVideo";

export default function NeatPost(props) {
  const { post } = props;
  const { slug, frontMatter, mdxSource } = post;
  const [isHovered, setHovered] = useState(false);
  const { title, media, mask, color } = frontMatter;
  const postItemRef = useRef(null);
  const mediaPath = `/images/work/${slug}/${media}`;
  const linkPath = `/work/${slug}`;
  const router = useRouter();
  const goToLink = () => {
    router.push(linkPath);
  };

  const handleMouseEnter = useMemo(() => () => setHovered(true), []);
  const handleMouseLeave = useMemo(() => () => setHovered(false), []);

  return (
    <div
      className={`d-flex flex-column justify-content-center
      ${isHovered && "hovered-card"}`}
      onTouchStart={goToLink}
      onClick={goToLink}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="neat-view-img"></div>
      <div className="d-flex flex-row pb-2">
        <div
          style={{
            backgroundColor: `${color}`,
            maskImage: `url("/images/site/${mask}")`,
            WebkitMaskImage: `url("/images/site/${mask}")`,
          }}
          className="masked neat-view-icon"
          mediapath={mediaPath}
        ></div>
        <p className={`m-0 align-self-center ${isHovered && "hovered-text"}`}>
          {title}
        </p>
      </div>
    </div>
  );
}
