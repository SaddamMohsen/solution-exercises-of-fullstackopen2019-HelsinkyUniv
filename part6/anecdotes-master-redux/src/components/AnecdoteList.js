import React from 'react'
import { addVote,deleteAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList =(props)=>{
 let anecdotes = props.anecdotes
 anecdotes= anecdotes.sort((a,b) => (a.votes< b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))
 
 const vote = async(id,content) => {

  // const newAnec=await anecService.addVote(id,content)
    props.addVote(content)
   props.setNotification(`you voted : ${content.content}`,5)
    
  }

  const deleteAnec=async(id)=>{
    console.log(id)
      props.deleteAnecdote(id)

  }
   return(
     <div >
       <h2>Programming Anecdotes</h2>
       <ul>
        {props.visibleAnecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <div className="flot" >
            {anecdote.content}
             <br/>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote)}>vote</button>
            <button onClick={()=>deleteAnec(anecdote.id)}>Delete</button>
          </div>
        </li>
      )}
      </ul>
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
  setNotification,
  deleteAnecdote
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

