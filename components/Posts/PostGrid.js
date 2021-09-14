// import { Grid } from './styles';
import PostItem from './PostItem';
import GridLayout from 'react-grid-layout';

export default function PostGrid(props) {
  const { posts } = props;

  // Generate a dynamic layout
  // Messy cols={1} 
  
  return (
    <GridLayout
      className="layout">
      {posts.map((post) => (
        <PostItem
          key={post.slug}
          post={post}
        />
      ))}
    </GridLayout>
  );
}
