// import { Grid } from './styles';
import PostItem from './PostItem';
import GridLayout from 'react-grid-layout';

export default function PostGrid(props) {
  const { posts } = props;

  const gridLayoutProps = {
    isDraggable: false,
    isResizable: false
  }

  const onDrag = (event) => {
    console.log("CHECKING BINDED DRAG EVENT", event)
  }

  // Generate a dynamic layout  
  return (
    <GridLayout
      className="layout"  {...gridLayoutProps} onDrag={onDrag}>
      {posts.map((post) => (
        <PostItem
          key={post.slug}
          post={post}
        />
      ))}
    </GridLayout>
  );
}
