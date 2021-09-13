import PostGrid from '../Posts/PostGrid';

export default function Featured(props) {
  return (
    <section>
      <PostGrid posts={props.posts} />
    </section>
  );
}
