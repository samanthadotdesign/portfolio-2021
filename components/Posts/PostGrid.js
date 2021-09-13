import { Grid } from './styles';
import PostItem from './PostItem';
import React, { useState, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
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
  const stageRef = useRef(null);

  console.log('####')
  console.log(INITIAL_STATE);

  const [ postsPosition, setPostsPosition ] = useState([]);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setPostPosition(
      postsPosition.map( (postPosition) => {
        return {
          ...postPosition,
          isDragging: postPosition.id === id
        }
      })
    )
  }

  const handleDragEnd = (e) => {
    setPostPosition(
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
      height={window.innerHeight}
      ref={stageRef}>
      <Layer>
        {postsPosition.map( (post) => (
          <PostItem
            key={post.slug}
            post={post}
            />
        ))}
      </Layer>
    </Stage>
  );
}
