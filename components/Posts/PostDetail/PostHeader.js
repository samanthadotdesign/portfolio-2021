import Image from 'next/image';

export default function PostHeader(props) {
  const { title, image } = props;
  // Image already comes in the full path
  return (
    <header>
      <h1>{title}</h1>
      <Image
        src={image}
        alt={title}
        width={200}
        height={300}
      />
    </header>
  );
}
