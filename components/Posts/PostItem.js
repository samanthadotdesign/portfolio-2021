import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import LoopingVideo from '../PostDetail/LoopingVideo';

const PostItemContainer = (props) => {
	const { goToLink, mediaPath, title, ratioW, ratioH } = props;
	return (
		<div className = "mw-100 mh-100"
			onClick = {
				goToLink
			} >
			{mediaPath.split('.')[1] == 'mp4' ?
				<LoopingVideo src={mediaPath} 
					title = {
						title
					}
					className = "mw-100 mh-100 userSelectNone" />
				:
				<Image
					src = {
						mediaPath
					}
					alt = {
						title
					}
					width = {
						ratioW
					}
					height = {
						ratioH
					}
					layout="responsive"
					objectFit = "contain"
					className = "mw-100 mh-100 userSelectNone" />
			}
				
			<div>
				<h3>{title}</h3>
			</div>
		</div>
	);
};

export default function PostItem(props) {
	const { isMessy, post } = props;
	const { slug, frontMatter, mdxSource } = post;
	const { title, media, ratioW, ratioH } = frontMatter;
	const [position, setPosition] = useState( {x: 0, y: 0} );
	const [size, setSize] = useState({width: 400, height: 200});
	const [isDragging, setIsDragging] = useState(false);
	const rndRef = useRef(null);

	// window height and width are rendered in the frontend
	// Messy layout
	useEffect(() => {
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
					className="bordertest drag-cursor"
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
        />
			}
		</>
	);
}
