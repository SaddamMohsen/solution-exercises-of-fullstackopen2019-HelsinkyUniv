 const initialState=''
const filterReducer=(state=initialState,action)=>{
    console.log("from Filter",action.filter,action.type)
    switch(action.type){
        case 'ADD_FILTER':
            return action.filter
        default:
             return state
    }
}

export const addFilter=(filter)=>{
    return{
        type:'ADD_FILTER',
        filter
    }
}

export default filterReducer