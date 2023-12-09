import React, { useRef, useState, useMemo } from "react";
import { useRouter } from "next/router";
import LoopingVideo from "../PostDetail/LoopingVideo";

export default function NeatPost(props) {
  const { post } = props;
  const { slug, frontMatter, mdxSource } = post;
  const [isHovered, setHovered] = useState(false);
  const { title, media, mask, color, coverImage } = frontMatter;
  const postItemRef = useRef(null);
  const coverImagePath = `/images/work/${slug}/${coverImage}`;
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
      className="neat-view-container d-flex flex-column justify-content-center"
      onTouchStart={goToLink}
      onClick={goToLink}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <video
          src={mediaPath}
          className="neat-view-media"
          autoPlay={isHovered}
          muted
          loop
          // style={{
          //   transform: "scale(1.05)",
          //   boxShadow: "0 30px 30px 10px rgba(0,0,0,.2)",
          // }}
        />
      ) : (
        <img src={coverImagePath} className="neat-view-media" />
      )}
      <div className="d-flex flex-row pb-2">
        <div
          style={{
            backgroundColor: `${color}`,
            maskImage: `url("/images/site/${mask}")`,
            WebkitMaskImage: `url("/images/site/${mask}")`,
          }}
          className="masked neat-view-icon"
        ></div>
        <p className={`m-0 align-self-center ${isHovered && "hovered-text"}`}>
          {title}
        </p>
      </div>
    </div>
  );
}
