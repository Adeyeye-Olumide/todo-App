import React, { useState, ChangeEvent } from 'react'

import './file.css'

interface Props {
    addToArray : (e :ChangeEvent<HTMLFormElement> )=> void
}

function InputComponent(prop : Props) {

    
    return (
        <form className='input' onSubmit={prop.addToArray}>
        <input className='input_box' type='input' placeholder='Enter a task'/>
        <button className='input_button' type='submit'>GO</button>
        </form>
    )
}

export default InputComponent
