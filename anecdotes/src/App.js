import './App.css';
import './index.css';
import React, { useState } from 'react'



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]




const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(Array.from(Array(anecdotes.length), () => 0))
  const[maxim,setMax] = useState(0);

const handleClick=()=>{
	setSelected(Math.floor((Math.random()*anecdotes.length)+0));
	}
 const handleVote=(id)=>{
   const points=[...votes];
   points[id] +=1
    setVotes(points);
    var max_of_array = points.indexOf(Math.max(...points))
    setMax(max_of_array);
     }
  return (
    <div className="App-header">
    <h1>Anecdote of the Day</h1>
	<button onClick={()=>handleClick(selected)}> Next anecdote </button>
	<button onClick={()=>handleVote(selected)}> Vote </button>
 
      {anecdotes[selected]}<br/>
      This Has {votes[selected]} votes

      <h2>Anecdote with Max Votes</h2>
       {anecdotes[maxim]}
	   <br/>
	   Has {votes[maxim]} Votes
    </div>
  )
}


export default App;