import userService from "../services/users";
import { userConstants } from "./userConstant";
const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
};

export const getAll = () => {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
};
export default usersReducer;
