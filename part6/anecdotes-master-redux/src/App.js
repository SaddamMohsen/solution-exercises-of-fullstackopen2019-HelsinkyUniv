import React from 'react';
import {useEffect} from 'react'
import {connect} from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

import {initializeAnecdotes} from './reducers/anecdoteReducer'
import './App.css'
const App = (props) => {
  
  useEffect(()=>{
    props.initializeAnecdotes()

  },[])

  return (
    <div className="App-header">
    <h2>create new</h2>
      <Filter className="App-header"/>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(null,{initializeAnecdotes})(App)