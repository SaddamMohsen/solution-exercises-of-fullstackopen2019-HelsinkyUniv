import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import App from './App'
import store from './store'




store.subscribe(()=>{
  console.log(store.getState())
})
 
//const render = () => {
  ReactDOM.render(
    <Provider store={store}>
    <App  />
    </Provider>,
    document.getElementById('root')
  )
//}

//render()
//store.subscribe(render)