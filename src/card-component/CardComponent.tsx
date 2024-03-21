import React, { useState, MouseEventHandler, useEffect } from 'react'

import { Todo, Handler} from '../App'


import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'

import './file.css'

interface props {
    todos: Todo,
    key: number,
    id : string,
    editHandler : Handler['editHandler']
    
    
}





function CardComponent({todos, id, editHandler} : props) {

    const [edit, setEdit] = useState<boolean>(false)

    useEffect(()=> {

        setEdit(false)
    }, [todos.todo])




  return (
    <form className='todo__single' id ={id} onSubmit = {
        
        (e)=> {
            editHandler(e)
        }}>
       
        {   
             edit? <input type="text" className= 'todo__single--edit' defaultValue={todos.todo}/>
            :
            (
            todos.isDone?
            <s className='todo__single--text'>{todos.todo}</s> :
            <span className='todo__single--text'>{todos.todo}</span>
            )

           
            
        }
       
        <div>
            <span className='icon edit__icon'>
                <AiFillEdit onClick={()=> setEdit(!edit)}></AiFillEdit>

            </span>
            <span className='icon delete__icon'>
                <AiFillDelete></AiFillDelete>
        
            </span>
            <span className='icon'>
                <MdDone className='isDone__icon'></MdDone>
        
            </span>

        </div>
        

      
    </form>
  )
}

export default CardComponent
