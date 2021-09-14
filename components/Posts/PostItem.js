import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';

export default function PostItem(props) {
	console.log(props);
	const { title, image, slug } = props.post;
	const [position, setPosition] = useState( {x: 0, y: 0} );
	const [isDragging, setIsDragging] = useState(false);

	const rndRef = useRef(null);

	// window height and width are rendered in the frontend
	useEffect(() => {
		// If isMessy, we take the random positions
		if (props.isMessy) {
			setPosition(
				{x: Math.random() * window.innerWidth, 
					y: Math.random() * window.innerHeight});
		}
		else {
			console.log('**************');
			console.log(props.dataGrid);
		  setPosition({x: props['data-grid'].x, y: props['data-grid'].y});
		}
	}, []);

	const imagePath = `/images/work/${slug}/${image}`;
	const linkPath = `/work/${slug}`;

	const onDragStart = ()=>{
		setIsDragging(true);
	};
  
	const onDragStop = (event, data)=>{
		setPosition( { x: data.x, y: data.y});
		setIsDragging(false);
	};

	const router = useRouter();

	const goToLink = () =>{
		if(!isDragging) {
			router.push(linkPath);
		}
	};
	console.log('***********'); 
	console.log(position);
	return (
		<Rnd
			ref={rndRef}
			position={position}
			onDragStart={onDragStart}
			onDragStop={onDragStop}
			className="bordertest"
		>
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
		</Rnd>
	);
}
