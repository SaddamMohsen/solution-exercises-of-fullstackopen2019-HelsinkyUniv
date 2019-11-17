import React, { useState,useEffect } from 'react'
import personServices from './Services/person'

//component to filter show based on input value
const Filter=(props)=>{
 return(
   <div>
   <form>
          <label htmlFor="name" >Filter Shown By Name</label>
            <input type="text" id="name"
              value={props.values}
              onChange={props.onChange}/>
      </form>
   </div>

 )
}

const InputFrom=(props)=>{
  return(
    <div>
    <input value={props.val} onChange={props.onChange} required/>
    </div>
  )
}
//components to input new Person
const PersonForm=(props)=>{

  return(
    <form onSubmit={props.addPerson}>
        <div>
          name:   <InputFrom val={props.newName} onChange={props.onAddName} />
          number: <InputFrom val={props.newNumber}  onChange={props.onAddNumber} />
                  <button type="submit">add</button>
        </div>
      </form>)
}

//component to show all person detaile
const Persons=(props)=>{
  return(
   props.persons.filter(props.isSearched(props.searchName)).map(per=>
   <div key={per.id}>
   <Person
      person={per}
      deletePerson={props.deleteInput}
      />
      </div>
   )
  )
}

//Component to show One person detaile
const Person=({person,deletePerson})=>{
  return(
    <div key={person.id}>
     {person.name}
     {person.number}
     <button onClick={()=>deletePerson(person.id)}>delete</button>
    </div>
  )

}
const App = () => {
  const [persons,setPersons] = useState([])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [searchName,setSearchName]=useState('')

useEffect(()=>{
   personServices
    .getAll()
    .then(initperson => {
      setPersons(initperson)
    })
}, [])


// this function is used to check whether the new name is added already or not 
//if the new name is not found it return true otherwise it return false
const isAdded = () =>{
   let flag=false
   //let id =0
  persons.filter(names=>{
    if(names.name.toLowerCase().indexOf(newName.toLowerCase()) !==-1)
          {flag=true}
            return flag });
    return flag }

//this function used to add new person into the persons array
const addPerson=(event)=>{ 
  event.preventDefault()
   const obj={ 
     name:newName,
     number:newNumber}
      
       if(!isAdded())
       {
         personServices
             .create(obj)
               .then(createdObj => {
                 console.log(createdObj)
                setPersons(persons.concat(createdObj))
                setNewName('')
                 setNewNumber('')
      })
       }
       else{
         const pers=persons.find(name=>name.name===newName)
         if(pers.number!==newNumber)
         {
           if(!window.confirm(`${pers.name}is added to phonebook ,Replace the old Number with this?`)) {
             return
           }
           else{
             const changedPers={...pers,number:newNumber}
               personServices
               .update(pers.id,changedPers)
                .then(updateObj=>{
                  setPersons(persons.map(per=>per.id!==pers.id?per:changedPers))
                  setNewName('')
                  setNewNumber('')
                })
           }
         }
         else
          alert(newName +' is already added to phonebook')
       }
}

//function that is used be to seach
const isSearched = SearchTerm => item =>
    item.name.toLowerCase().indexOf(SearchTerm.toLowerCase()) !== -1;
    
const addName=(event)=>setNewName(event.target.value)
const addNumber=(event)=>setNewNumber(event.target.value) 
const onChangeSearch=(event)=>setSearchName(event.target.value)
//function that delete input based on id
const deleteInput=(id)=>{
//console.log('Id to be deleted is :',id)
if(!window.confirm("Are you sure you want to delete this?")) {
return
}
  const person=persons.filter(per=>per.id !==id)
   personServices
    .deleteInput(id)
    setPersons(person)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter values={searchName}
              onChange={onChangeSearch}
              />
      <h2>Add New</h2>
      <PersonForm 
            addPerson={addPerson}
            newName={newName}
            newNumber={newNumber}
            onAddName={addName}
            onAddNumber={addNumber}
          />
                           
      <h2>Numbers</h2>
      <Persons
          persons={persons}
          isSearched={isSearched}
          searchName={searchName}
          deleteInput={deleteInput}
          />
    </div>
  )
}

export default App