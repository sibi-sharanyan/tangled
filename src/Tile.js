import React, {  useState , useEffect} from "react";
import { ItemTypes } from "./Constants";
import { useDrag } from "react-dnd";
import { useDrop } from 'react-dnd'



export default function Tile(props) {

   
    const [hasDropped, setStatus] = useState(false);
    
    const [letter, setLetter] = useState(props.letter);
    
    useEffect(() => {
        //  setStatus(false);

      
            setStatus(false);
            setLetter(props.letter);
            
         
    } , [ props.levelno , props.letter])


    const [{ isOver  }, drop] = useDrop({
		accept: ItemTypes.TILE,
		drop: (item , monitor) => {
            setStatus(false);
            setLetter(monitor.getItem().letter);
            

        },
		collect: monitor => ({
            isOver: !!monitor.isOver()
         
		}),
	})



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
    
if(!hasDropped) 
{
    return (
        <div  ref={drag}
        style={{
         
          backgroundColor: isDragging ? 'white' : 'yellow'
        }}  className = "tile">
            { isDragging ? ' ' : letter}
        </div>
    )
}else {
    return (

        <div className= {isOver ? "squareHover" : "square"} ref = {drop}  >
              
        </div>
    )
}


}

