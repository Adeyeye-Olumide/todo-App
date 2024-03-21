import React, { ChangeEventHandler, useState, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import InputComponent from './inputComponent/inputComponent';
import { FormEvent, ChangeEvent, MouseEvent} from 'react';
import CardComponent from './card-component/CardComponent';
import { IconType } from 'react-icons';

export interface Todo {
  todo : string, 
  id: number,
  isDone: boolean
}


export interface Handler {
  isDoneHandler: (this: HTMLDivElement, e: globalThis.MouseEvent) => any,
  manageEditHandler: (this: HTMLDivElement, e: globalThis.MouseEvent) => any,
  editHandler: ( e: FormEvent)=> void
}



function App() {
  const [todoArray, setTodoArray] = useState<Todo[]>([])

  let iconTargetTagName: string = ''

  const addToArray = useCallback((e: ChangeEvent<HTMLFormElement>)=> {

    e.preventDefault()
    
    let inputEl = (e.target.querySelector(".input_box") as HTMLInputElement)
    setTodoArray([...todoArray, {todo: inputEl.value, id: todoArray.length, isDone:false}])

    inputEl.value = ''
    inputEl.blur()


  }, [todoArray])
   

  const isDoneHandler : Handler["isDoneHandler"] = ( e: globalThis.MouseEvent) => {
   

    const iconTarget = (e.target as SVGElement) || (e.target as SVGPathElement)

    console.log(iconTarget)


    

    if (iconTarget.closest(".isDone__icon")) setTodoArray(todoArray.map((todos, i, array) => {

      const iconTargetString = (iconTarget?.closest(".todo__single")as HTMLFormElement).querySelector(".todo__single--text")?.textContent

      if(todos.todo == iconTargetString) return {...todos, isDone: !todos.isDone}
      
      return todos
    
    }))
    

    

    if (iconTarget.closest(".delete__icon")) setTodoArray([...todoArray].filter(todos => todos.todo != (iconTarget?.closest(".todo__single")as HTMLFormElement).querySelector(".todo__single--text")?.textContent))


    console.log(todoArray)
    
  }

  const editHandler: Handler["editHandler"] = useCallback((e: FormEvent)=> {
    console.log("yes")

    e.preventDefault()


    const formTarget = (e.target as HTMLFormElement)
    const inputEl = (formTarget.querySelector('.todo__single--edit') as HTMLInputElement)
    let string = inputEl.defaultValue

    console.log(string)

   

    console.log(formTarget)

    setTodoArray(todoArray.map(todos => todos.todo == string?
    {...todos, todo: inputEl.value}: todos
    ))

    console.log(todoArray)







    
  }, [todoArray])


  const deleteTodo : Handler["isDoneHandler"] = (e: globalThis.MouseEvent)=> {

    const iconTarget = (e.target as SVGElement)

    if (!iconTarget.classList.contains("delete__icon")) return

    console.log('deleting')


    setTodoArray([...todoArray].filter(todos => todos.id.toString() != (iconTarget?.closest('.todo__single') as HTMLFormElement).id))


  }

  // const manageEditHandler:  Handler["manageEditHandler"] = (e: globalThis.MouseEvent) => {

  //   // e.preventDefault()

  //   if ((e.target as HTMLFormElement).classList.contains('todo__single')) return

  //   const allForm = (document.querySelectorAll('.todo__single') as NodeList)

  //   allForm.forEach(form => (form as HTMLFormElement).id == (e.target as HTMLFormElement).id? (form as HTMLFormElement).addEventListener("submit", editHandler)
  //   : (form as HTMLFormElement).removeEventListener("submit", editHandler))


  // }




  useEffect(()=> {

   
    const element = (document.querySelector('.App') as HTMLDivElement)
    

    element.addEventListener("click", isDoneHandler)
    
    
   

    return ()=> {
      element.removeEventListener("click", isDoneHandler)
      
      
      
    }




  }, [todoArray])

  


  return (
   
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputComponent addToArray={addToArray}/>
      
        {todoArray.map((todos, index)=> 

          <CardComponent todos = {todos}  key = {index} id = {index.toString()} editHandler = {editHandler}></CardComponent>
        )}
    
      
    </div>
  
  );
}

export default App;
