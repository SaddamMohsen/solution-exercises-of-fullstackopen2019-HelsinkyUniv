import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import blogReducer from "./reducers/blogsReducer";
import notificaionReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificaionReducer,
  user: loginReducer,
  users: usersReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
