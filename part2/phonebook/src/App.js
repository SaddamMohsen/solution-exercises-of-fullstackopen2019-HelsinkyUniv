import React, { useState } from 'react'



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

const Persons=(props)=>{

  return(
   props.persons.filter(props.isSearched(props.searchName)).map(per=><div key={per.name}>{per.name} {per.number}</div>)
  )
}
const App = () => {
  const [persons,setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Saddam Hussein', number:'777-207-896'}
  ])

  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [searchName,setSearchName]=useState('')

const isAdded = () =>{
   let flag=true
  persons.filter(names=>{
    if(names.name.toLowerCase().indexOf(newName.toLowerCase()) !==-1)
            flag=false 
            return flag });
    return flag }

const addPerson=(event)=>{ 
  event.preventDefault()
   const obj={name:newName,
   number:newNumber}
       if(isAdded())
       {
         setPersons(persons.concat(obj))
        setNewName('')
        setNewNumber('')
       }
       else
          alert(newName +' is already added to phonebook')
}
const isSearched = SearchTerm => item =>
    item.name.toLowerCase().indexOf(SearchTerm.toLowerCase()) !== -1;
    
const addName=(event)=>setNewName(event.target.value)
const addNumber=(event)=>setNewNumber(event.target.value) 
const onChangeSearch=(event)=>setSearchName(event.target.value)


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
          />
    </div>
  )
}

export default App
