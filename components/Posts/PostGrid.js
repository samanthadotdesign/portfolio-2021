import { Grid } from './styles';
import PostItem from './PostItem';
import React, { useState, useRef } from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import Konva from 'konva';

/**
 * Creates random positions for posts with Konva canvases
 * @param {*} posts array of post objects
 * @returns array of posts with random positions
 */
const generateRandomPositions = (posts) => {
  return [...posts].map((post) => ({
    ...post,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false
  }));
}

export default function PostGrid(props) {
  const { posts } = props;
  const INITIAL_STATE = generateRandomPositions(posts);
  // const stageRef = useRef(null);
  console.log(INITIAL_STATE)

  const [ postsPosition, setPostsPosition ] = useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setPostsPosition(
      postsPosition.map( (postPosition) => {
        return {
          ...postPosition,
          isDragging: postPosition.id === id
        }
      })
    )
  }

  const handleDragEnd = (e) => {
    setPostsPosition(
      postsPosition.map( (postPosition) => {
        return {
          ...postPosition,
          isDragging: false
        }
      })
    )
  }

  return (
    <Stage 
      width={window.innerWidth} 
      height={window.innerHeight}>
      <Layer>
        {postsPosition.map((post) => (
          // <PostItem 
          // key={post.slug}
          // post={post}>
            <Circle
              fill="red"
              radius={25}
              key={post.slug}
              x={post.x}
              y={post.y}
              draggable
              rotation={post.rotation}
              scaleX={post.isDragging ? 1.2 : 1}
              scaleY={post.isDragging ? 1.2 : 1}
              // onDragStart={handleDragStart}
              // onDragEnd={handleDragEnd}
              />
          // </PostItem>
        ))}
      </Layer>
    </Stage>
  );
}
