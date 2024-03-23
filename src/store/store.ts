import {configureStore, createSlice ,  combineSlices} from '@reduxjs/toolkit'

import {persistReducer, persistStore} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import { TodoReducer } from '../App'
import { Todo } from '../App'

import {logger} from 'redux-logger'
const initialState: Todo[] = []

// const todoReducer: TodoReducer = (state = initialState, {type,  payload}) => {

//     if (type == "setTodoArray") return payload

//     return state

// }

const todoSlice = createSlice({
    name:"todos",
    initialState,
    reducers: {
        setTodoArray(state: Todo[], action:{type: string, payload: Todo[]}){
            return action.payload

        },

        setDateCompleted(state: Todo[]){
            return [...state].map(todos => todos.isDone? {...todos, dateCompleted: new Date().toLocaleString()}: todos)
        }
    }
})

export const{setTodoArray, setDateCompleted} = todoSlice.actions



// const middleware = applyMiddleware(logger)

// const rootReducer = {
//     todoStore: todoSlice.reducer


// }

const rootReducer = combineSlices({
    todoStore: todoSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage
}




const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})



const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
