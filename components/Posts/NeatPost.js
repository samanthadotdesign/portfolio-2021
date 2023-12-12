import React, { useRef, useState, useMemo } from "react";
import NextLink from "next/link";

export default function NeatPost(props) {
  const { post } = props;
  const { slug, frontMatter, mdxSource } = post;
  const [isHovered, setHovered] = useState(false);
  const { title, media, mask, color, coverImage } = frontMatter;
  const postItemRef = useRef(null);
  const coverImagePath = `/images/work/${slug}/${coverImage}`;
  const mediaPath = `/images/work/${slug}/${media}`;
  const linkPath = `/work/${slug}`;
  const handleMouseEnter = useMemo(() => () => setHovered(true), []);
  const handleMouseLeave = useMemo(() => () => setHovered(false), []);

  return (
    <NextLink
      href={linkPath}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="neat-view-container d-flex flex-column justify-content-center">
        <img src={coverImagePath} className="neat-view-media" />
        <div className="neat-view-title d-flex flex-row">
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
    </NextLink>
  );
}
