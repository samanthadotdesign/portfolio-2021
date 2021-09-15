import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import React from 'react';

function PostItemContainer(props){
	const { goToLink, imagePath, title } = props;

	return (
		<div onClick={goToLink}>
			<div>
				<Image
					src={imagePath}
					alt={title}
					width={200}
					height={100}
					className="userSelectNone"
				/>
			</div>
			<div>
				<h3>{title}</h3>
				<p>Interaction Design</p>
			</div>
		</div>
	);
}

export default function PostItem(props) {
	const { isMessy } = props;
	const { title, image, slug } = props.post;
	const [position, setPosition] = useState( {x: 0, y: 0} );
	const [size, setSize] = useState({width: 400, height: 200});
	const [isDragging, setIsDragging] = useState(false);

	const rndRef = useRef(null);

	// window height and width are rendered in the frontend
	useEffect(() => {
		console.log(isMessy);
		// If isMessy, we take the random positions
		if (isMessy) {
			setPosition(
				{x: Math.random() * window.innerWidth, 
					y: Math.random() * window.innerHeight});
		}
		else {
		  setPosition({x: props['data-grid'].x, y: props['data-grid'].y});
		}
	}, []);

	const imagePath = `/images/work/${slug}/${image}`;
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
      	className="bordertest"

      	size={size}
      	onResizeStop={handleResizeStop}
      >
      	<PostItemContainer 
      		goToLink={goToLink}
      		imagePath={imagePath}
      		title={title}/>
      </Rnd>
			}
      
			{!isMessy &&     
        <PostItemContainer 
        	goToLink={goToLink}
        	imagePath={imagePath}
        	title={title}/>
			}
		</>
	);
}
