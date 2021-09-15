import React, { useContext }  from 'react';
import { GlobalContext, ACTIONS } from '../../store'
import PostItem from './PostItem';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function PostGrid(props) {
	const { posts } = props;
	const { layoutStoreState, layoutDispatch } = useContext(GlobalContext) 
	const { isMessy } = layoutStoreState;

	const toggleMessy = () => {
		// If layout is messy, the user wants to change it to neat
		if (isMessy) {
			layoutDispatch({type: ACTIONS.NEAT_MODE})
		}
		else {
			layoutDispatch({type: ACTIONS.MESSY_MODE})
		}
	};
  
	// Generate a dynamic layout  
	return (
		<>
			<button onClick={toggleMessy}>
				{isMessy ? 'BACK TO NEAT MODE' : 'BACK TO MESSY MODE'}
			</button>
    
			{isMessy && 
      <div className="layout">
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
			breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
			cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
    >
    	{posts.map((post, index) => (
    		<div 
    			key={index} 
    			className="bordertest"
    			data-grid={
    				{x:post.x, y:post.y, 
    					w: post.w, h: post.h, 
    					minW: post.w, minH: post.h, 
    					maxW:8, maxH:4}}
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


