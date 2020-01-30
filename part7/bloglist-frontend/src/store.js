import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import blogReducer from './reducers/blogsReducer'
import notificaionReducer from './reducers/notificationReducer'

 const reducer=combineReducers({
  blogs:blogReducer,
  notification:notificaionReducer
})

const store = createStore(reducer,applyMiddleware(thunk))

export default store