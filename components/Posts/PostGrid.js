
import React, { useState }  from 'react';
import PostItem from './PostItem';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function PostGrid(props) {
	const { posts } = props;
	const [isMessy, setIsMessy] = useState(true);

	const toggleMessy = () => {
		setIsMessy(!isMessy);
	};

	/* const layout = [
		{ x: 0, y: 0, w: posts[0].w, h: posts[0].y, i: 0 },
		{ x: 0, y: 1, w: 3, h: 3, i: 1 }
	]; */
  
	const onDrag = () => {
		//console.log("CHECKING BINDED DRAG EVENT", event)
	};

	// Generate a dynamic layout  
	return (
		<>
			<button onClick={toggleMessy}>
				{isMessy ? 'BACK TO NEAT MODE' : 'BACK TO MESSY MODE'}
			</button>
    
			{isMessy && 
      <div
      	className="layout" 
      	onDrag={onDrag}>
      	{posts.map((post) => (
      		<PostItem
      			key={post.slug}
      			post={post}
      			isMessy={isMessy}
      		/>
      	))}
      </div>
			}

			{!isMessy && 
    <ResponsiveReactGridLayout
    	// WidthProvider option
    	measureBeforeMount={false}
    	//isBounded={true}
    	preventCollision={true}
    >
    	{posts.map((post, index) => (
    		<div 
    			key={index} 
    			className="bordertest"
    			data-grid={{x:post.x, y:post.y, w: post.w, h: post.h}}
    		>
    		<PostItem
    			post={post}
    			isMessy={isMessy}
    		/>
    		</div>
    	))}
    </ResponsiveReactGridLayout>
			}
		</>
	);
}


