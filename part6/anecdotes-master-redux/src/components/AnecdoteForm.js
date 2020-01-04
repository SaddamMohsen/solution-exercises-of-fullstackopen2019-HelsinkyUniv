import React from 'react'
import {createAnecodate} from '../reducers/anecdoteReducer'

const AnecdoteForm=(props)=>{
     const addAnecod=(e)=>{
          e.preventDefault()
          const content=e.target.anec.value
          props.store.dispatch(createAnecodate(content))
          e.target.anec.value=''
     }
     
    return(
        <form onSubmit={addAnecod}>
          <input name='anec' />
          <button type='submit'>Add Anecodate</button>
        </form>
    )
}

export default AnecdoteForm;