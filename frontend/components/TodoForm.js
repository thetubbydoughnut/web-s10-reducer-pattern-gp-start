import React, { useReducer } from 'react'

const CHANGE_LABEL = 'CHANGE_LABEL'
const CHANGE_IS_COMPLETED = 'CHANGE_IS_COMPLETED'

const initialState = {
  todoLabel: '',
  todoIsCompleted: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LABEL: 
      return {...state, todoLabel: action.payload}
    case CHANGE_IS_COMPLETED:
      return {...state, todoIsCompleted: action.payload}
    default:
      return state

  }
}

export default function TodoForm({ createNewTodo }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const onLabelChange = ({ target: { value } }) => {
    dispatch({ type: CHANGE_LABEL, payload: value})
   }
  const onIsCompletedChange = ({ target: { checked } }) => {
    dispatch({ type: CHANGE_IS_COMPLETED, payload: checked})
   }
  const resetForm = () => { 
    dispatch({ type: CHANGE_LABEL, payload: ''})
    dispatch({ type: CHANGE_IS_COMPLETED, payload: false})
  }
  
  const onNewTodo = evt => {
    evt.preventDefault()
    createNewTodo(state.todoLabel, state.todoIsCompleted)
    resetForm()
  }

  return (
    <form id="todoForm" onSubmit={onNewTodo}>
      <h3>New Todo Form</h3>
      <label><span>Todo label:</span>
        <input
          onChange={onLabelChange}
          value={state.todoLabel}
          type='text'
          name='todoLabel'
          placeholder='Type label'
        />
      </label>
      <label><span>Is completed:</span>
        <input
          onChange={onIsCompletedChange}
          checked={state.todoIsCompleted}
          type='checkbox'
          name='todoIsCompleted'
        />
      </label>
      <label><span>Create todo:</span>
        <input
          type='submit'
          value='Do it!'
        />
      </label>
    </form>
  )
}
