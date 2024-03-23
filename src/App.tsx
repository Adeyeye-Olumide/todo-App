import React, { ChangeEventHandler, useState, useEffect, useCallback, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import InputComponent from './inputComponent/inputComponent';
import { FormEvent, ChangeEvent, MouseEvent} from 'react';
import CardComponent from './card-component/CardComponent';
import { IconType } from 'react-icons';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, setTodoArray, setDateCompleted } from './store/store';



export interface Todo {
  todo : string, 
  id: number,
  isDone: boolean,
  dateCreated: string,
  dateCompleted: string

}


export interface Handler {
  isDoneHandler: (this: HTMLDivElement, e: globalThis.MouseEvent) => any,
  manageEditHandler: (this: HTMLDivElement, e: globalThis.MouseEvent) => any,
  editHandler: ( e: FormEvent)=> void
}

// interface TodoReducer {
//   todoreducer: (state: Todo[], action: {type: string, payload: Todo}) => Todo[]
 
// }

export type TodoReducer = (state: Todo[], action: {type: string, payload: Todo[]}) => Todo[]





function App() {

  // const todoReducer: TodoReducer = (state, {type,  payload}) => {

  //   if (type == "setTodoArray") return payload

  //   return state

  // }

 

  // const [todoArray, dispatch] = useReducer(todoReducer, [])

  // const setTodoArray = (data: Todo[])=>dispatch({type: 'setTodoArray', payload: data})
  // const [todoArray, setTodoArray] = useState<Todo[]>([])


  const dispatch = useDispatch()
  const todoArray = useSelector((state :RootState) => state.todoStore)

  const addToArray = useCallback((e: ChangeEvent<HTMLFormElement>)=> {


    e.preventDefault()
    
    let inputEl = (e.target.querySelector(".input_box") as HTMLInputElement)

    const conditionCheck = todoArray.some((todos: Todo )=> todos.todo == inputEl.value)

    if (conditionCheck) return alert("this todo already exists")
    dispatch(setTodoArray([...todoArray, {todo: inputEl.value, id: todoArray.length, isDone:false, dateCreated: new Date().toLocaleString(), dateCompleted: ''}]))

    inputEl.value = ''
    inputEl.blur()


  }, [todoArray])
   

  const isDoneHandler : Handler["isDoneHandler"] = ( e: globalThis.MouseEvent) => {
   

    const iconTarget = (e.target as SVGElement) || (e.target as SVGPathElement)

    console.log(iconTarget)


    

    if (iconTarget.closest(".isDone__icon")) {
      dispatch(setTodoArray(todoArray.map((todos: Todo,) => {

        const iconTargetString = (iconTarget?.closest(".todo__single")as HTMLFormElement).querySelector(".todo__single--text")?.textContent

        if(todos.todo == iconTargetString) return {...todos, isDone: !todos.isDone}
        
        return todos
    
      })))

      dispatch(setDateCompleted())
  
  
    }
    

    

    if (iconTarget.closest(".delete__icon")) dispatch(setTodoArray([...todoArray].filter(todos => todos.todo != (iconTarget?.closest(".todo__single")as HTMLFormElement).querySelector(".todo__single--text")?.textContent)))


    console.log(todoArray)
    
  }

  const editHandler: Handler["editHandler"] = useCallback((e: FormEvent)=> {
    console.log("yes")

    e.preventDefault()


    const formTarget = (e.target as HTMLFormElement)
    const inputEl = (formTarget.querySelector('.todo__single--edit') as HTMLInputElement)
    let string = inputEl.defaultValue

    inputEl.focus()
    console.log(string)

   

    console.log(formTarget)

   dispatch(setTodoArray(todoArray.map((todos: Todo) => todos.todo == string?
    {...todos, todo: inputEl.value}: todos
    )))

    

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

      <div className="container">
        <div className="todos">
          <span className="todos__heading">
            Active Tasks
          </span>
          
          {[...todoArray].filter(todos=> !todos.isDone).map((todos, index)=> 

            <CardComponent todos = {todos}  key = {index} id = {index.toString()} editHandler = {editHandler} date = {todos.dateCreated}></CardComponent>
          )}
        </div>
        <div className="todos remove">
        <span className="todos__heading">
            Completed Tasks
          </span>
          
          {[...todoArray].filter(todos=> todos.isDone).map((todos, index)=> 

            <CardComponent todos = {todos}  key = {index} id = {index.toString()} editHandler = {editHandler} date = {todos.dateCompleted}></CardComponent>
          )}

        </div>
      </div>
      
    
      
    </div>
  
  );
}

export default App;
