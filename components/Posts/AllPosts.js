import PostGrid from './PostGrid';

export default function AllPosts(props) {
  return (
    <section>
      <h1>All Work</h1>
      <PostGrid posts={props.posts} />
    </section>
  );
}
