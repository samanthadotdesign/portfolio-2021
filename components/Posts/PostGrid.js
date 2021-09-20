import React, { useContext }  from 'react';
import { GlobalContext } from '../../store';
import PostItem from './PostItem';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function PostGrid(props) {
	const { posts } = props; 
	const { layoutStoreState } = useContext(GlobalContext); 
	const { isMessy } = layoutStoreState;
	// Generate a dynamic layout  
	return (
		<>    
			{isMessy && 
      < div className = "layout" > 
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
    	{posts.map((post, index) => {
    		const { x, y, w, h } = post.frontMatter;
				
    		return (
    		<div 
    			key={index} 
    			className="bordertest"
    			data-grid={
    				{x, y, 
    					w, h, 
    					minW: w, minH: h, 
    					maxW:8, maxH:4}}
    		>
    		<PostItem
    			post={post}
    			isMessy={isMessy}
    		/>
    		</div>
    	);})}
    </ResponsiveReactGridLayout>
			}
		</>
	);
}


