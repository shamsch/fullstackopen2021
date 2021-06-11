import React, { useState } from 'react'

const DisplayPhonebook = (props) =>{
  let displayPersonList= props.filter.length? props.personsList.filter((obj)=> obj.name.toUpperCase()===props.filter.toUpperCase()): props.personsList
  return(
    <div>
      {displayPersonList.map((person, index)=> <p key={index}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  //all states
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  
  //event handlers 
  
  let allName= persons.map(person=> person.name)

  const addNewPerson = (e) => {
    e.preventDefault()
    if(allName.includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      let newPersonObject= {name: newName, number: newNumber}
      setPersons(persons.concat(newPersonObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const updateNameField = (e) =>{
    setNewName(e.target.value)
  }
  const updateNumberField = (e) =>{
    setNewNumber(e.target.value)
  }
  const updateFilterField = (e) =>{
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={filter} onChange={updateFilterField} /></div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={updateNameField}/>
        </div>
        <div>number: <input value={newNumber} onChange={updateNumberField} /></div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <DisplayPhonebook personsList={persons} filter={filter}></DisplayPhonebook>
      </div>
    </div>
  )
}

export default App
