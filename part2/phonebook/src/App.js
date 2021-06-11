import React, { useState } from 'react'
import DisplayPhonebook from './components/displayphonebook'
import Filter from './components/filter'
import PersonForm from './components/personform'

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
      <Filter filter={filter} updateFilterField={updateFilterField}></Filter>
      <h3>add a new</h3>
      <PersonForm updateNameField={updateNameField} updateNumberField={updateNumberField} addNewPerson={addNewPerson}></PersonForm>
      <h2>Numbers</h2>
      <DisplayPhonebook personsList={persons} filter={filter}></DisplayPhonebook>
    </div>
  )
}

export default App
