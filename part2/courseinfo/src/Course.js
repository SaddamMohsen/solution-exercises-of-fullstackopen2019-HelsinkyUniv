import React from 'react';


const Header = props =>
  <h1>{props.course}</h1>

const Total = ({parts}) => {
  const total = parts.reduce((s,p)=>{
     return(s+p.exercises)},0)
  return <p> <b>total of {total} Exercises</b> </p>
}
  

const Part = ({part}) =>(
  <p>{part.name}  {part.exercises} </p>)

const Content = ({contenet}) =>{
    const partt= () =>contenet.map(item=>
    <Part 
    key={item.id}
    part={item} 
    />
    )
  return(
    <div>
    {partt()}
  </div>
)
}

const Course = ({courses}) => {
  return(
   <div>
     <Header  course={courses.name} />
   <Content contenet={courses.parts}/>
   <Total parts={courses.parts}/>
   </div>)
   }

   export default Course