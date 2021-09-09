import ReactMarkdown from 'react-markdown';
import PostHeader from './PostHeader';

export default function PostContent(props) {
  const {
    slug, image, title, content,
  } = props.post;

  const imagePath = `/images/work/${slug}/${image}`;

  return (
    <article>
      <PostHeader
        title={title}
        image={imagePath}
      />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
