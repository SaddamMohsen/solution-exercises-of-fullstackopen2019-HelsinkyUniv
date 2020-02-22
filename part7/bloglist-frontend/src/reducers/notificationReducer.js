const initialState = null;
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return action.message;
    case "REMOVE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};
export const addNotification = message => {
  return {
    type: "ADD_NOTIFICATION",
    message
  };
};
export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
    message: ""
  };
};
export const setNotification = (message, timeToShow) => {
  return async dispatch => {
    dispatch(addNotification(message));
    setTimeout(() => dispatch(removeNotification()), timeToShow * 1000);
  };
};
export default notificationReducer;
