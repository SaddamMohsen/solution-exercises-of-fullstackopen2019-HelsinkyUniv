import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import './App.css'

const store = createStore(reducer)
store.subscribe(()=>{
    const average=store.getState().good/(store.getState().good+store.getState().bad+store.getState().ok)
  console.log('Average:',average +' %')
})
const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div className='App-header'>
      <button onClick={good}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good :{store.getState().good}</div>
      <div>neutral :{store.getState().ok}</div>
      <div>bad :{store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)