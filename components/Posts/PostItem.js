import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../../store";
import Image from "next/image";
import { Rnd } from "react-rnd";
import LoopingVideo from "../PostDetail/LoopingVideo";
import Marquee from "react-fast-marquee";

// Resize media inside PostItemContainer
const PostItemContainer = (props) => {
  const { goToLink, mediaPath, title, ratioW, ratioH, isHover, postItemRef } =
    props;
  const [marqueeText, setMarqueeText] = useState();

  // display block !important on span h4 + margin right
  useEffect(() => {
    let marqueeString = "";
    for (let i = 0; i < 20; i += 1) {
      marqueeString += title;
      marqueeString += "                ";
    }
    setMarqueeText(marqueeString);
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div
        ref={postItemRef}
        className="drag-cursor d-flex h-100 position-relative"
      >
        {mediaPath.split(".")[1] == "mp4" ? (
          <LoopingVideo
            src={mediaPath}
            // autoPlay={isHover}
            title={title}
            className="position-absolute object-fit-cover w-100 h-100 userSelectNone"
          />
        ) : (
          <Image
            src={mediaPath}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="userSelectNone"
          />
        )}
      </div>
      <div
        className="title-marquee-div bg-white border-top border-2 border-dark enter-cursor d-flex align-items-center"
        onClick={goToLink}
      >
        <Marquee play={isHover} speed={100} gradient={false}>
          <h4 className="p-3 marquee-title uppercase mb-0">{title}</h4>
        </Marquee>
      </div>
    </div>
  );
};

// Applies the Rnd wrapper parent conditionally
export default function PostItem(props) {
  const { isMessy, post, onDrag, zIndex } = props;
  const { slug, frontMatter, mdxSource } = post;
  const [isHover, setIsHover] = useState(false);
  const { title, media, w, h, ratioW, ratioH } = frontMatter;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const rndRef = useRef(null);
  const postItemRef = useRef(null);
  const { windowStoreState } = useContext(GlobalContext);
  const { window, breakpoints, cols } = windowStoreState;
  // breakpointsArray = [360,480,768,...]
  const breakpointsArr = Object.values(breakpoints).reverse();
  // colsArr = [2,4,...]
  const colsArr = Object.values(cols).reverse();

  //const [ isHover, setIsHover ] = useState(false);
  // Column for the size of the browser to pixels
  function translateColsToPixels(windowPixels, noColumns) {
    /* 
			100% -> breakpoints[currentBreakpoint]
			X    -> noColumns
		*/
    const currentBreakpoint = breakpointsArr.reduce((accumulator, current) => {
      //console.log('INSIDE REDUCER', windowPixels, current);
      const result = windowPixels >= current ? current : accumulator;
      return result;
    }, 360);
    const colIndex = breakpointsArr.indexOf(currentBreakpoint);
    const percentageNo = (noColumns * 100) / colsArr[colIndex];
    const noPixels = windowPixels * (percentageNo / 100);

    return Math.round(noPixels);
  }

  // window height and width are rendered in the frontend
  // Messy layout
  useEffect(() => {
    console.log("CHECKING USE EFFECT TRIGGER");

    // When it's in the messy layout, it will be in percentage
    if (isMessy) {
      const widthPixels = translateColsToPixels(window.width, w);
      const heightPixels = translateColsToPixels(window.height, h);

      setSize({ width: `${widthPixels}px`, height: `${heightPixels}px` });
      setPosition({
        x: Math.random() * window.width - widthPixels,
        y: Math.random() * window.height - heightPixels,
      });
    } else {
      // When the program first loads, it will be in the neat layout which takes values from mdx (noColumns)
      setSize({ width: w, height: h });
    }
  }, []);

  const mediaPath = `/images/work/${slug}/${media}`;
  const linkPath = `/work/${slug}`;

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = (event, data) => {
    setPosition({ x: data.x, y: data.y });
    setIsDragging(false);
  };

  const handleResize = (event, direction, ref, delta, position) => {
    setSize({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
    setPosition(position);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const router = useRouter();

  const goToLink = () => {
    if (!isDragging) {
      router.push(linkPath);
    }
  };

  return (
    <>
      {isMessy && (
        <Rnd
          ref={rndRef}
          position={position}
          onDragStart={() => {
            onDrag();
            handleDragStart();
          }}
          onDragStop={handleDragStop}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          minWidth="100px"
          minHeight="200px"
          size={{ width: size.width, height: size.height }}
          onResizeStop={handleResize}
          className="border border-2 border-dark d-flex flex-column"
          style={{ zIndex }}
        >
          <PostItemContainer
            goToLink={goToLink}
            mediaPath={mediaPath}
            title={title}
            ratioW={ratioW}
            ratioH={ratioH}
            isHover={isHover}
            postItemRef={postItemRef}
          />
        </Rnd>
      )}

      {!isMessy && (
        <PostItemContainer
          goToLink={goToLink}
          mediaPath={mediaPath}
          title={title}
          ratioW={ratioW}
          ratioH={ratioH}
          isHover={isHover}
          postItemRef={postItemRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
}
