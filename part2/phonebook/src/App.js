import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNewPerson = (e) => {
    e.preventDefault()
    if(persons.map(person=> person.name).includes(newName)){
      alert(newName+" is already added to the phonebook")
    }
    else{
      let newPersonObject= {name: newName}
      setPersons(persons.concat(newPersonObject))
      setNewName('')
    }
  }

  const updateNameField = (e) =>{
    setNewName(e.target.value)
  }

  let allName = persons.map((person, index)=> <p key={index}>{person.name}</p>)
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={updateNameField}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {allName}
      </div>
    </div>
  )
}

export default App
