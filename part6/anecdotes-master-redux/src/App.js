import React from 'react';
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import './App.css'
const App = (props) => {
  

  const store = props.store
  
  
  

  return (
    <div className="App-header">
    <h2>create new</h2>
      <AnecdoteForm store={store}/>
      <AnecdoteList store={store}/>
    </div>
  )
}

export default App