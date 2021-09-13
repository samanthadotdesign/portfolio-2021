import { Grid } from './styles';
import PostItem from './PostItem';

export default function PostGrid(props) {
  const { posts } = props;
  console.log((posts));
  return (
    <Grid>
      {posts.map((post) => (
        <PostItem
          key={post.slug}
          post={post}
        />
      ))}
    </Grid>
  );
}
