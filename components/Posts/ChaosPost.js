"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GlobalContext, ACTIONS } from "../../store";
import { Rnd } from "react-rnd";
import LoopingVideo from "../PostDetail/LoopingVideo";

const ChaosBubble = (props) => {
  const { goToLink, mediaPath, isHover, postItemRef } = props;

  return (
    <>
      <div
        onTouchStart={goToLink}
        onClick={goToLink}
        className="h-100 d-flex flex-column"
      >
        <div ref={postItemRef} className="d-flex h-100 position-relative">
          {isHover && (
            <LoopingVideo
              src={mediaPath}
              className="position-absolute object-fit-cover w-100 h-100 userSelectNone"
            />
          )}
        </div>
      </div>
    </>
  );
};

// Applies the Rnd wrapper parent conditionally
export default function ChaosPost(props) {
  const { post, onDrag, zIndex } = props;
  const { slug, frontMatter, mdxSource } = post;
  const [isHover, setIsHover] = useState(false);
  const { title, media, w, h, ratioW, ratioH, mask, color } = frontMatter;
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
  function getRandomPositionWithinConstraints(size, axis) {
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
    const widthPixels = translateColsToPixels(window.width, w);
    const heightPixels = translateColsToPixels(window.height, h);

    setSize({ width: `${widthPixels}px`, height: `${heightPixels}px` });
    setPosition({
      x: getRandomPositionWithinConstraints(widthPixels, "x"),
      y: getRandomPositionWithinConstraints(heightPixels, "y"),
    });
  }, [window]);

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
      {window.width && window.height ? (
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
          className="d-flex flex-column masked"
          style={{
            zIndex,
            backgroundColor: `${color}`,
            maskImage: `url("/images/site/${mask}")`,
            WebkitMaskImage: `url("/images/site/${mask}")`,
          }}
        >
          <ChaosBubble
            goToLink={goToLink}
            mediaPath={mediaPath}
            isHover={isHover}
            postItemRef={postItemRef}
          />
        </Rnd>
      ) : null}
    </>
  );
}
