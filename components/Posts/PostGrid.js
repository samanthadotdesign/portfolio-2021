import PostItem from './PostItem';
import { useState } from 'react';
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
    	isBounded={true}
    	preventCollision={true}    	
    	breakpoints={{ lg: 1200 }}
    	cols={{ lg: 12 }}
    >
    	{posts.map((post, index) => (
    		<div key={index}>
    		<PostItem
    			post={post}
    			isMessy={isMessy}
    			data-grid={{x:index, y:index, w: post.w, h: post.h}}
    		/>
    		</div>
    	))}
    </ResponsiveReactGridLayout>
			}
		</>
	);
}
