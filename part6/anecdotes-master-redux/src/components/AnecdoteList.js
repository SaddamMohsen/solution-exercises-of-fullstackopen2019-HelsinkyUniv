import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList =(props)=>{
  const store=props.store
 let anecdotes = props.store.getState()
 anecdotes= anecdotes.sort((a,b) => (a.votes< b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))

 const vote = (id) => {
    store.dispatch(addVote(id))
  }
   return(
     <div className="App-header">
       <h2>Anecdotes</h2>
     
        {anecdotes.map(anecdote =>
        <div  className="App-link" key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
   )

}

export default AnecdoteList

