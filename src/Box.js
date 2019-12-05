import React ,  { useState , useEffect } from 'react'
import { ItemTypes } from './Constants'
import { useDrop } from 'react-dnd'
import { useDrag } from "react-dnd";

export default function Box(props) {
  
    const [isEmpty, setStatus] = useState(true);
    const [letter, setLetter] = useState('');
 
    useEffect(() => {
        //  setStatus(true);
 
            setStatus(true);
            
       
        
    } , [props.levelno] )
    const [{isDragging}, drag] = useDrag({
        item: { type: ItemTypes.TILE  , letter},

        end: (item, monitor) => {
            if(monitor.didDrop() === true) {
                setStatus(true);
            }
        } ,
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
      })



    const [{ isOver , DropResult }, drop] = useDrop({
		accept: ItemTypes.TILE,
		drop: (item , monitor) => {
            setStatus(false);
            setLetter(monitor.getItem().letter);
            props.onDrop(props.boxno , monitor.getItem().letter);
      
        },
		collect: monitor => ({
            isOver: !!monitor.isOver(),
            DropResult : monitor.getDropResult()
		}),
	})

    if(isEmpty === true) 
    {
        return (

            <div className= {isOver ? "squareHover" : "square"} ref = {drop}   >
              
            </div>
        )
    }else {
        

        return (

            <div  ref={drag}
        style={{
            backgroundColor: isDragging ? 'white' : 'yellow'
        }}  className = "tile">
             { isDragging ? ' ' : letter}
        </div>
        )

    }

}
