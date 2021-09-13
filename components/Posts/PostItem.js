import Link from 'next/link';
import Image from 'next/image';

export default function PostGrid(props) {
  const { title, image, slug } = props.post;

  const imagePath = `/images/work/${slug}/${image}`;
  const linkPath = `/work/${slug}`;

  return (
    <li>
      <Link href={linkPath}>
        <a>
          <div>
            <Image
              src={imagePath}
              alt={title}
              width={200}
              height={100}
              layout="responsive"
            />
          </div>
          <div>
            <h3>{title}</h3>
            <p>Interaction Design</p>
          </div>
        </a>
      </Link>
    </li>
  );
}
