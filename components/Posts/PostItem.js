import Link from 'next/link';
import Image from 'next/image';
import Draggable from 'react-draggable';
import { useState, useEffect } from 'react'

export default function PostGrid(props) {
  const { title, image, slug } = props.post;

  const [position, setPosition] = useState( 
    {x: 0, 
    y: 0} )

  // window height and width are rendered in the frontend
  
  useEffect( () => {
    setPosition({x: Math.random() * window.innerWidth, 
    y: Math.random() * window.innerHeight})
  }, [])

  const imagePath = `/images/work/${slug}/${image}`;
  const linkPath = `/work/${slug}`;
  console.log(imagePath);

  const trackPos = (data) => {
    setPosition( { x: data.x, y: data.y})
  }

  return (
    <Draggable
      position={position}
      onDrag={(e, data) => trackPos(data)}>
      <div>
        <Link href={linkPath}>
          <a>
            <div>
              <Image
                src={imagePath}
                alt={title}
                width={200}
                height={100}
              />
            </div>
            <div>
              <h3>{title}</h3>
              <p>Interaction Design</p>
            </div>
          </a>
        </Link>
      </div>
    </Draggable>
  );
}
