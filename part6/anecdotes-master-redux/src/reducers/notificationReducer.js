const initialState = ''
const notificationReducer=(state=initialState,action)=>{
      switch (action.type) {
    case 'ADD_NOTIFICATION':
         return action.message
    case 'REMOVE_NOTIFICATION':
        return initialState
    default:
      //console.log('notification reducer', action.type);
      return state;
  }
}
export const addNotification=(message)=> {
  return {
    type: 'ADD_NOTIFICATION',
    message
  };
}
export const removeNotification=()=> {
  return {
    type: 'REMOVE_NOTIFICATION',
    message:''
  };
}

export default notificationReducer