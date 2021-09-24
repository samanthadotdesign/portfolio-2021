import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../store';
import Image from 'next/image';
import { Rnd } from 'react-rnd';
import LoopingVideo from '../PostDetail/LoopingVideo';
import Marquee from 'react-fast-marquee';

// Resize media inside PostItemContainer
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

// Applies the Rnd wrapper parent conditionally
export default function PostItem(props) {
	const { isMessy, post } = props;
	const { slug, frontMatter, mdxSource } = post;
	const [ isHover, setIsHover ] = useState(false);
	const { title, media, w, h, ratioW, ratioH } = frontMatter;
	const [position, setPosition] = useState( {x: 0, y: 0} );
	const [size, setSize] = useState();
	const [isDragging, setIsDragging] = useState(false);
	const rndRef = useRef(null);
	const postItemRef = useRef(null);
	const { windowStoreState } = useContext(GlobalContext);
	const { window } = windowStoreState;

	//const [ isHover, setIsHover ] = useState(false);
	// Column for the size of the browser 
	function translateColsToPercentage(windowWidth, noColumns) {
		
		const breakpoints = {
			1200: 12,
			996: 10,
			768: 8,
			480: 6,
			360: 4
		};

		/* 
			100% -> breakpoints[currentBreakpoint]
			X    -> noColumns
		*/
		
		const currentBreakpoint = Object.keys(breakpoints).reduce((accumulator, current)=>{
			const result = windowWidth <= current ? current : accumulator;
			return result;
		}, 0);

		return (noColumns *100)/breakpoints[currentBreakpoint];
	}

	
	// const { currentWidth, currentHeight } = useResizeObserver({ ref: postItemRef });

	// window height and width are rendered in the frontend
	// Messy layout
	useEffect(() => {
		// When the program first loads, it will be in the neat layout which takes values from mdx (noColumns)
		setSize({width: w, height: h});
		// When it's in the messy layout, it will be in percentage
		if (isMessy) {
			setSize({width: translateColsToPercentage(window.width, w), height: translateColsToPercentage(window.height, h)});
			setPosition(
				{x: Math.random() * window.innerWidth, 
					y: Math.random() * window.innerHeight});
		}
	}, [isMessy]);

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
