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
		<>
			<div style={{flexGrow:1}} className="drag-cursor py-0 bg-warning">
				{/* <div ref={postItemRef} className="bordertest bg-white d-flex flex-column h-100"> */}
				{/* mediaPath.split('.')[1] == 'mp4' ?
					<LoopingVideo 
						src={mediaPath}
						// autoPlay={isHover}
						title = {title}
						className = "object-fit-cover w-100 h-100 userSelectNone" />
					:
					<Image
						src = {mediaPath}
						alt = {title}
						width = {ratioW}
						height = {ratioH}
						layout="responsive"
						objectFit = "cover"
						className = "w-100 h-100 userSelectNone" /> */
				}

			</div>
			<div 
				className="title-marquee-div enter-cursor d-flex align-items-center"
				onClick={goToLink} >
				<Marquee 
					play={isHover}
					speed={100}
					gradient={false}>
					<h4 className="marquee-title uppercase">{marqueeText}</h4>
				</Marquee>
				{/* </div>  */}
			</div>
		</>
	);
};

// Applies the Rnd wrapper parent conditionally
export default function PostItem(props) {
	const { isMessy, post } = props;
	const { slug, frontMatter, mdxSource } = post;
	const [ isHover, setIsHover ] = useState(false);
	const { title, media, w, h, ratioW, ratioH } = frontMatter;
	const [position, setPosition] = useState( {x: 0, y: 0} );
	const [size, setSize] = useState({width:0, height:0});
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
	// Column for the size of the browser 
	function translateColsToPercentage(windowWidth, noColumns) {
		/* 
			100% -> breakpoints[currentBreakpoint]
			X    -> noColumns
		*/
		const currentBreakpoint = breakpointsArr.reduce((accumulator, current)=>{
			//console.log('INSIDE REDUCER', windowWidth, current);
			const result = windowWidth >= current ? current : accumulator;
			return result;
		}, 360);
		/* console.log('**** CURRENT BREAKPOINT ****');
		console.log(currentBreakpoint); */
		const colIndex = breakpointsArr.indexOf(currentBreakpoint);
		/* console.log('** COL INDEX ***');
		console.log(colIndex); */
		return (noColumns *100)/colsArr[colIndex];
	}

	// const { currentWidth, currentHeight } = useResizeObserver({ ref: postItemRef });

	// window height and width are rendered in the frontend
	// Messy layout
	//useEffect(() => {
	console.log('CHECKING USE EFFECT TRIGGER');

	// When it's in the messy layout, it will be in percentage
	if (isMessy) {
		const widthPercentage = translateColsToPercentage(window.width, w);
		const heightPercentage = translateColsToPercentage(window.height, h);
			
		//console.log('CHECKING PERCENTAGES', window, widthPercentage, heightPercentage);
			
		setSize({width: `${widthPercentage}%`, height: `${heightPercentage}%`});
		setPosition(
			{x: Math.random() * window.width, 
				y: Math.random() * window.height});
	} else {			
		// When the program first loads, it will be in the neat layout which takes values from mdx (noColumns)
		setSize({width: w, height: h});
	}
	//}, [isMessy, window]);

	const mediaPath = `/images/work/${slug}/${media}`;
	const linkPath = `/work/${slug}`;

	const handleDragStart = ()=>{
		setIsDragging(true);
	};
  
	const handleDragStop = (event, data)=>{
		setPosition( { x: data.x, y: data.y});
		setIsDragging(false);
	};

	const handleResize = (event, direction, ref, delta, position) => {
		setSize({
			width: ref.offsetWidth,
			height: ref.offsetHeight,
			...position
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
					size={{width:size.width, height:size.height}}
					onResize={handleResize}
					className="bordertest d-flex flex-column"
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
        	onMouseEnter={handleMouseEnter}
        	onMouseLeave={handleMouseLeave}
        />
			}
		</>
	);
}
