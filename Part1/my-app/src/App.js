/* eslint-disable no-const-assign */
import React from 'react';
import  { useState } from 'react';

import ReactDOM from 'react-dom';

import './App.css';

const Button =(probs)=>( <button onClick={probs.handleClick}>{probs.text}</button>)

const Statistic=({text,value})=>(
<div>
<table>
<tbody>
<tr><td>{text} :</td><td>{value}</td></tr>
</tbody>
</table>
</div>
)

const Statistics = (probs)=>{
      if(probs.allva !== 0){
  return(
    /* <div>
      <table>
	  <tbody>
         <tr><td>good</td><td>{probs.good}</td></tr> 
         <tr><td>neutral</td><td> {probs.neutral}</td></tr>
         <tr><td> bad</td><td>{probs.bad}</td></tr>
         <tr><td> All</td><td>{probs.allva}</td></tr> 
         <tr><td>Average</td><td>{(probs.good-probs.bad)/probs.allva}% </td></tr>
         <tr><td>Possitive Avg</td><td>{probs.good/probs.allva}%</td></tr>
         </tbody>
		 </table>
         </div>) */
		<div>
		 <Statistic text="Good" value={probs.good} />
		 <Statistic text="Neutral" value={probs.Neutral} />
		 <Statistic text="Bad" value={probs.bad} />
		 <Statistic text="All " value={probs.allva} />
		 <Statistic text="Average" value={(probs.good-probs.bad)/probs.allva} />
		 <Statistic text="Possitive Avg" value={probs.good/probs.allva} />
		</div>
      )
	  }
      return(
      <h3>No feedback Given</h3>
      )
}
  
  const App =()=> {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allva,setAll] = useState(0)
  
const handleGood=()=>{
  setAll(allva+1);
  setGood(good+1);
}

const handleNeutral=()=>{
setAll(allva+1);
setNeutral(neutral+1)
}

const handleBad=()=>{
  setAll(allva+1);
  setBad(bad+1)
  }
  return (
    <div className='App-header'>
    <h1>Give FeedBack</h1>
    <Button handleClick={handleGood} text='Good'/> 
    <Button handleClick={handleNeutral} text='Neutral'/>
    <Button handleClick={handleBad} text='Bad'/>
    <h2>Statistics</h2>
    <Statistics good={good} bad={bad} neutral={neutral} allva={allva} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

export default App;
