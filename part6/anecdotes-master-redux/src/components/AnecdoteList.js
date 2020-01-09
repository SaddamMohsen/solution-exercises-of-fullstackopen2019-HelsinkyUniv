import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import {addNotification,removeNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList =(props)=>{
 let anecdotes = props.anecdotes
 anecdotes= anecdotes.sort((a,b) => (a.votes< b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))


 const vote = (id,content) => {

    
    props.addVote(id)
    props.addNotification('you voted :'+content)
    setTimeout(()=>{
      props.removeNotification()
    },5000)
  }
   return(
     <div>
       <h2>Anecdotes</h2>
     
        {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div className="App-link">
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
          </div>
        </div>
      )}
      </div>
   )
}

const anecdToShow=({anecdotes,filter})=>{
  if (filter==='')
  return anecdotes
  else
   return(anecdotes.filter(anec=>anec.content.indexOf(filter)!==-1?anec:''))
}
const mapStateToProps=(state)=>{
  return{
    anecdotes:state.anecdotes,
    visibleAnecdotes:anecdToShow(state)
  }
}

const mapDispatchToProps={
  addVote,
  addNotification,
  removeNotification
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

