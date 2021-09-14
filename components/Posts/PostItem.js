import { useRouter } from 'next/router'
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Rnd } from "react-rnd";

export default function PostGrid(props) {
  const { title, image, slug } = props.post;
  const [position, setPosition] = useState( {x: 0, y: 0} )
  const [isDragging, setIsDragging] = useState(false)

  const rndRef = useRef(null)

  // window height and width are rendered in the frontend
  
  useEffect( () => {
    setPosition({x: Math.random() * window.innerWidth, 
    y: Math.random() * window.innerHeight})
    //console.log("CHECKING REF", rndRef)
    // updatePosition(position)
    //rndRef.updatePosition(position)
  }, [])

  const imagePath = `/images/work/${slug}/${image}`;
  const linkPath = `/work/${slug}`;
  //console.log(imagePath);

  /* const trackPos = (data) => {
    setPosition( { x: data.x, y: data.y})
  }

  const handleDrag = (e, data) => {
    setIsDragging(true)
    trackPos(data)
    //console.log("CHECKING ISDRAGGING ON DRAG", isDragging)
  }*/
  
  const onDragStart = ()=>{
    setIsDragging(true)
  }
  
  const onDragStop = (event, data)=>{
    setPosition( { x: data.x, y: data.y})
    setIsDragging(false)

    /* console.log("CHECHING VARIABLE BEFORE STOPING", isDragging)
    setTimeout(() => {
      setTimeout(()=>{
        console.log("CHECHING VARIABLE AFTER STOPING", isDragging)
      }, 10)
      
    }, 10); */
  }

  const router = useRouter()

  const goToLink = (/* event */) =>{
    //event.preventDefault()
    console.log("CHECK ISDRAGGING VARIABLER", isDragging)
    if(!isDragging) {
      //console.log("GOING TO LINK", isDragging)
      router.push(linkPath)
    }
  } 
  console.log(position)
  return (
    <Rnd
      ref={rndRef}
      position={position}
      onDragStart={onDragStart}
      //onDrag={handleDrag}
      onDragStop={onDragStop}
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
    </Rnd>
  );
}
