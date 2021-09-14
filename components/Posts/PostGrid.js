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
    >
    	{posts.map((post, index) => (
    		<PostItem
    			key={post.slug}
    			post={post}
    			isMessy={isMessy}
    			data-grid={{x:index, y:index, w: 1, h: 1}}
    		/>
    	))}
    </ResponsiveReactGridLayout>
			}
		</>
	);
}
