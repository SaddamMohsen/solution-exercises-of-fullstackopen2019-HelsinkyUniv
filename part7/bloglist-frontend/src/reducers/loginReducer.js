import loginService from "../services/login";
import userService from "../services/users"
import { userConstants } from "./userConstant";

let user = JSON.parse(localStorage.getItem("loggedUser"));
const initialState = user ? user : null;

const loginReducer = (state = initialState, action) => {
  //console.log('from login reducer',action.type,action.data)
  switch (action.type) {
    
    case userConstants.LOGIN_REQUEST:
      console.log("from login success", action.loggedUser);
      if (action.data.loggedUser)
        window.localStorage.setItem(
          "loggedUser",
          JSON.stringify(action.data.loggedUser)
        );
      return action.data.loggedUser;
    case userConstants.LOGIN_SUCCESS:
      console.log("from login success", action.loggedUser);
      if (action.data.loggedUser)
        window.localStorage.setItem(
          "loggedUser",
          JSON.stringify(action.data.loggedUser)
        );
      return action.data.loggedUser;
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return action.data;
    default:
      return state;
  }
};

export const logIn = user => {
  return async dispatch => {
    const loggedUser = await loginService.login(user);
    dispatch({
      type: userConstants.LOGIN_SUCCESS,
      data: { loggedUser }
    });
  };
};
export const logOut = () => {
  window.localStorage.clear("loggedUser");
  return { type: userConstants.LOGOUT, data: null };
};



export default loginReducer;
