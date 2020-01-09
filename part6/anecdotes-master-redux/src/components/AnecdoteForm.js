import React from 'react'
import {createAnecodate} from './../reducers/anecdoteReducer'
import {addNotification,removeNotification} from './../reducers/notificationReducer'
import { connect } from 'react-redux'
const AnecdoteForm=(props)=>{
     const addAnecod=(e)=>{
          e.preventDefault()
          const content=e.target.anec.value
          props.createAnecodate(content)
          //set the notification message
          props.addNotification('you added new anecdote :'+content)

          //remove notification message
        setTimeout(()=>{
           props.removeNotification()
                   },5000)
             e.target.anec.value=''
     }
     
    return(
        <form onSubmit={addAnecod}>
          <input name='anec' />
          <button type='submit'>Add Anecodate</button>
        </form>
    )
}

const mapDispatchToProps={
    createAnecodate,
    addNotification,
    removeNotification
  
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)