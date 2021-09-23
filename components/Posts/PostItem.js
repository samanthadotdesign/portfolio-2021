import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import LoopingVideo from '../PostDetail/LoopingVideo';
import Marquee from 'react-fast-marquee';
import useResizeObserver from 'use-resize-observer';

const PostItemContainer = (props) => {
	const { goToLink, mediaPath, title, ratioW, ratioH, isHover, postItemRef } = props;
	const [ marqueeText, setMarqueeText ] = useState();

	useEffect(() => {
		let marqueeString = '';
		for (let i = 0; i < 5; i += 1 ) {
			marqueeString += title;
			marqueeString += '·    ·    ·    ·    ·   ·    ·    ·    ·    ·';
		}
		setMarqueeText(marqueeString);
	}, []);

	return (
		<div ref={postItemRef} className="bordertest mw-100 mh-100">
			<div className="drag-cursor py-0">
				{mediaPath.split('.')[1] == 'mp4' ?
					<LoopingVideo 
						src={mediaPath}
						// autoPlay={isHover}
						title = {title}
						className = "mw-100 mh-100 userSelectNone" />
					:
					<Image
						src = {mediaPath}
						alt = {title}
						width = {ratioW}
						height = {ratioH}
						layout="responsive"
						objectFit = "contain"
						className = "mw-100 mh-100 userSelectNone" />
				}
			</div>
			<div 
				className="title-marquee-div enter-cursor mw-100 mh-100"
				onClick={goToLink} >
				<Marquee 
					play={isHover}
					speed={100}
					gradient={false}>
					<h4 className="marquee-title uppercase">{marqueeText}</h4>
				</Marquee>
			</div>
		</div>
	);
};

export default function PostItem(props) {
	const { isMessy, post } = props;
	const { slug, frontMatter, mdxSource } = post;
	const [ isHover, setIsHover ] = useState(false);
	const { title, media, ratioW, ratioH } = frontMatter;
	const [position, setPosition] = useState( {x: 0, y: 0} );
	const [size, setSize] = useState();
	const [isDragging, setIsDragging] = useState(false);
	const rndRef = useRef(null);
	const postItemRef = useRef(null);
	
	const { currentWidth, currentHeight } = useResizeObserver({ ref: postItemRef });

	// window height and width are rendered in the frontend
	// Messy layout
	useEffect(() => {

		setSize({width: currentWidth, height: currentHeight});
		if (isMessy) {
			setPosition(
				{x: Math.random() * window.innerWidth, 
					y: Math.random() * window.innerHeight});
		}
	}, []);

	const mediaPath = `/images/work/${slug}/${media}`;
	const linkPath = `/work/${slug}`;

	const handleDragStart = ()=>{
		setIsDragging(true);
	};
  
	const handleDragStop = (event, data)=>{
		setPosition( { x: data.x, y: data.y});
		setIsDragging(false);
	};

	const handleResizeStop = (event, direction, ref, delta, position) => {
		setSize({
			width: ref.style.width,
			height: ref.style.height,
		});
	};

	const handleMouseEnter = () => {
		setIsHover(true);
	};

	const handleMouseLeave = () => {
		setIsHover(false);
	};
  
	const router = useRouter();

	const goToLink = () =>{
		if(!isDragging) {
			router.push(linkPath);
		}
	};

	return (
		<>
			{isMessy && 
				<Rnd
					ref={rndRef}
					position={position}
					onDragStart={handleDragStart}
					onDragStop={handleDragStop}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					// maxWidth="30%"
					// maxHeight="100px"
					size={size}
					onResizeStop={handleResizeStop}
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
			}
      
			{!isMessy &&     
        <PostItemContainer
        	goToLink={goToLink}
        	mediaPath={mediaPath}
        	title={title}
        	ratioW={ratioW}
        	ratioH={ratioH}
        	isHover={isHover}
        	postItemRef={postItemRef}
        />
			}
		</>
	);
}
