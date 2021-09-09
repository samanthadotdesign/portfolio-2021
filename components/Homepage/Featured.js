import PostGrid from '../Posts/PostGrid';

export default function Featured(props) {
  return (
    <section>
      <h2>Featured posts</h2>
      <PostGrid posts={props.posts} />
    </section>
  );
}
