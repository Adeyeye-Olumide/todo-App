import React, { useState, MouseEventHandler, useEffect, useRef } from 'react'

import { Todo, Handler} from '../App'


import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'

import './file.css'

interface props {
    todos: Todo,
    key: number,
    id : string,
    editHandler : Handler['editHandler'],
    date: string
    
    
    
}





function CardComponent({todos, id, editHandler, date } : props) {

    const [edit, setEdit] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const imgUrl =   "https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?size=626&ext=jpg"

    useEffect(()=> {

        setEdit(false)
    }, [todos.todo])

    useEffect(()=> {
        inputRef.current?.focus()
       
    }, [edit])






  return (
    <form className='todo__single' id ={id} style={{backgroundImage: `url(${imgUrl})`}} onSubmit = {
        
        (e)=> {
            editHandler(e)
        }}>
       
        {   
             edit? <input type="text" className= 'todo__single--edit' defaultValue={todos.todo} ref={inputRef}/>
            :
            (
            todos.isDone?
            <s className='todo__single--text'>{todos.todo}</s> :
            <span className='todo__single--text'>{todos.todo}</span>
            )

           
            
        }
       
        <div className='todo__single--options'>
            <div>
            <span className='icon edit__icon'>
                <AiFillEdit onClick={()=>{ 

                    setEdit(!edit) 
                  
                    }}></AiFillEdit>

            </span>
            <span className='icon delete__icon'>
                <AiFillDelete></AiFillDelete>
        
            </span>
            <span className='icon'>
                <MdDone className='isDone__icon'></MdDone>
        
            </span>


            </div>

            <div className="time">
                {!todos.isDone?<span>created: {date} </span>: <span>completed: {date}</span>}
            </div>
            


        </div>
        {/* <div className="time">
            {todos.dateCreated}
        </div> */}
        

      
    </form>
  )
}

export default CardComponent
