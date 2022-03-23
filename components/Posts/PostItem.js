import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GlobalContext, ACTIONS } from "../../store";
import Image from "next/image";
import { Rnd } from "react-rnd";
import LoopingVideo from "../PostDetail/LoopingVideo";

// Resize media inside PostItemContainer
const PostItemContainer = (props) => {
  const {
    goToLink,
    mediaPath,
    title,
    ratioW,
    ratioH,
    mask,
    isHover,
    postItemRef,
    className,
    style,
    color,
  } = props;
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
    <div
      onClick={goToLink}
      style={style}
      className={`h-100 d-flex flex-column ${className}`}
    >
      <div ref={postItemRef} className="d-flex h-100 position-relative">
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
    </div>
  );
};

// Applies the Rnd wrapper parent conditionally
export default function PostItem(props) {
  const { isMessy, post, onDrag, zIndex } = props;
  const { slug, frontMatter, mdxSource } = post;
  const [isHover, setIsHover] = useState(false);
  const { title, media, w, h, ratioW, ratioH, mask } = frontMatter;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const rndRef = useRef(null);
  const postItemRef = useRef(null);
  const { windowStoreState, layoutDispatch } = useContext(GlobalContext);
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

  function getInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Returns coordinates for the shape that sits within the canvas
  function getRandomPositionWithinConstrains(size, axis) {
    const margins = axis == "x" ? (window.width > 768 ? 120 : 48) : 122;
    const windowSize = (axis == "x" ? window.width : window.height) - margins;

    const random = getInt(0, 80);

    const coordinate = (random / 100) * windowSize;

    const conditional = coordinate + size > windowSize;

    const final = !conditional ? coordinate : windowSize - size;

    return final;
  }

  // window height and width are rendered in the frontend
  // Messy layout
  useEffect(() => {
    // When it's in the messy layout, it will be in percentage
    if (isMessy) {
      const widthPixels = translateColsToPixels(window.width, w);
      const heightPixels = translateColsToPixels(window.height, h);

      setSize({ width: `${widthPixels}px`, height: `${heightPixels}px` });
      setPosition({
        x: getRandomPositionWithinConstrains(widthPixels, "x"),
        y: getRandomPositionWithinConstrains(heightPixels, "y"),
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

    setTimeout(() => {
      setIsDragging(false);
    }, 100);
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
    layoutDispatch({ type: ACTIONS.SET_CURSOR_TEXT, payload: title });
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    layoutDispatch({ type: ACTIONS.SET_CURSOR_TEXT, payload: "" });
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
          onDrag={() => {
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
          className="d-flex flex-column masked"
          style={{
            zIndex,
            maskImage: `url("/images/site/${mask}")`,
            WebkitMaskImage: `url("/images/site/${mask}")`,
          }}
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
          style={{
            zIndex,
            maskImage: `url("/images/site/${mask}")`,
            WebkitMaskImage: `url("/images/site/${mask}")`,
          }}
          className="masked"
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
