import React from 'react'
import {createAnecodate} from './../reducers/anecdoteReducer'
import {setNotification} from './../reducers/notificationReducer'
import { connect } from 'react-redux'
const AnecdoteForm=(props)=>{
     const addAnecod=(e)=>{
          e.preventDefault()
          const content=e.target.anec.value
         // console.log(content)
          e.target.anec.value=''
          props.createAnecodate(content)
           //set the notification message
          props.setNotification(`you added new anecdote :${content}`,3)
             
     }
     
    return(
        <form className="frm" onSubmit={addAnecod}>
          <input name='anec' />
          <button type='submit'>Add Anecodate</button>
        </form>
    )
}

const mapDispatchToProps={
    createAnecodate,
    setNotification  
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)