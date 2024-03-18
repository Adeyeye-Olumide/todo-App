import React, { ChangeEventHandler, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputComponent from './inputComponent/inputComponent';
import { FormEvent, ChangeEvent,} from 'react';

export interface Todo {
  todo : string, 
  id: number,
  isDone: boolean
}

function App() {
  const [todoArray, setTodoArray] = useState<Todo[]>([])

  const addToArray = (e: ChangeEvent<HTMLFormElement>)=> {

    e.preventDefault()
    
    let inputEl = (e.target.querySelector(".input_box") as HTMLInputElement)
    setTodoArray([...todoArray, {todo: inputEl.value, id: todoArray.length, isDone:false}])

    inputEl.value = ''
    inputEl.blur()


  }


  


  return (
   
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputComponent addToArray={addToArray}/>
      
        {todoArray.map(({todo, id, isDone})=> 
          <li key={id}>{todo}</li>
        )}
    
      
    </div>
  
  );
}

export default App;
