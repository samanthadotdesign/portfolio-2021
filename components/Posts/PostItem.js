import { useRouter } from 'next/router'


import Image from 'next/image';
import Draggable from 'react-draggable';
import { useState, useEffect } from 'react'

export default function PostGrid(props) {
  const { title, image, slug } = props.post;

  const [position, setPosition] = useState( {x: 0, y: 0} )

  const [isDragging, setIsDragging] = useState(false)

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

  const handleDrag = (e, data) => {
    setIsDragging(true)
    trackPos(data)
    //console.log("CHECKING ISDRAGGING ON DRAG", isDragging)
  }

  const onDragStop = ()=>{

    console.log("CHECHING VARIABLE BEFORE STOPING", isDragging)
    setTimeout(() => {
      setIsDragging(false)
      setTimeout(()=>{
        console.log("CHECHING VARIABLE AFTER STOPING", isDragging)
      }, 10)
      
    }, 10);
  }

  const router = useRouter()

  const goToLink = (/* event */) =>{
    //event.preventDefault()
    console.log("CHECK ISDRAGGING VARIABLER", isDragging)
    if(!isDragging) {
      console.log("GOING TO LINK", isDragging)
      router.push(linkPath)}
  } 

  return (
    <Draggable
      position={position}
      // onStart -> sets drag to true (trigger drag event)
      // onDrag -> handles drag functionality
      // onStop -> sets drag to false (ends drag event)
      // onClick needs to be bound to a certain part 
      onDrag={handleDrag}
      onStop={onDragStop}
      >
        <div onClick={goToLink}>
          <div>
            <Image
              src={imagePath}
              alt={title}
              width={200}
              height={100}
              className="userSelectNone"
              />
          </div>
          <div>
            <h3>{title}</h3>
            <p>Interaction Design</p>
          </div>
        </div>
    </Draggable>
  );
}
