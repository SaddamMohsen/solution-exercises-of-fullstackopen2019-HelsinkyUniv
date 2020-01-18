import anecService from '../services/anecdotes'
/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (10000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/
const anecodoteReducer = (state=[], action) => {
  console.log(state,action.type)
   switch(action.type){
     case 'NEW_ANEC':
        return state.concat(action.data)
     case 'INIT_ANECDOTES':
         return action.data
     case 'ADD_VOTE':
      /* const id=action.data.id
       const anecVote=state.find(s=>s.id===id)
       const anecChang={...anecVote,votes:anecVote.votes+1}*/
       return state.map(anecs=>anecs.id !==action.data.votedAnec.id?anecs:action.data.votedAnec)
     case 'DEL_ANEC':
        return state.filter(st=>st.id !==action.id)
      default:
         return state
   }
}
export const createAnecodate=(anecdote)=>{
    return async dispatch=> {
      const anec=await anecService.creatNew(anecdote)
      dispatch({
      type:'NEW_ANEC',
      data:anec.data,
      })
      }
  }

export const deleteAnecdote=(id)=>{
  return async dispatch=>{
    const delAnec = await anecService.deleteAnec(id)
    dispatch({
    type:'DEL_ANEC',
    id
  })
  }
}
export const initializeAnecdotes = () => {
  return async dispatch=>{
     const anecdotes=await anecService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
export const addVote =(anecdote)=>{
  return async dispatch=> {
    const votedAnec = await anecService.addVote(anecdote.id,anecdote)
    dispatch({
    type:'ADD_VOTE',
    data:{votedAnec}
  })
  }
}

export default anecodoteReducer;