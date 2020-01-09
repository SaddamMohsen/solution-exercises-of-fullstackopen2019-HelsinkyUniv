import React from 'react';
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import './App.css'
const App = () => {
  

  return (
    <div className="App-header">
    <h2>create new</h2>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App