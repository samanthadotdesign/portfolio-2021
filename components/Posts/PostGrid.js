import React, { useContext }  from 'react';
import { GlobalContext } from '../../store';
import PostItem from './PostItem';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function PostGrid(props) {
	const { posts } = props; 
	const { layoutStoreState, windowStoreState } = useContext(GlobalContext); 
	const { isMessy } = layoutStoreState;
	const { breakpoints, cols } = windowStoreState;
	// Generate a dynamic layout  
	return (
		<>    
			{isMessy && (
      	<div className = "layout" > 
      		{posts.map((post) => (
      			<PostItem
      				key={post.slug}
      				post={post}
      				isMessy={isMessy}
      			/>
      		))}
      	</div>
			)}

			{!isMessy && (
				<ResponsiveReactGridLayout
					// WidthProvider option
					measureBeforeMount={false}
					//isBounded={true}
					preventCollision={true}
					compactType='horizontal'
					breakpoints={breakpoints}
					cols={cols}>
					{posts.map((post, index) => {
						const { x, y, w, h } = post.frontMatter;
						
						return (
							<div 
								key={index} 
								className="drag-cursor border border-2 border-dark"
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
						);
					})}
				</ResponsiveReactGridLayout>
			)}
		</>
	);
}


