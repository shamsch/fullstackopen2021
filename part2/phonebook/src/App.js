import React, { useState, useEffect } from "react";
import DisplayPhonebook from "./components/displayphonebook";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import services from "./services/phonebook";

const App = () => {
  //all states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  //use effect to fetch data from the server running at port 3001 locally

  useEffect(
    () =>
      services.getAll().then((initialData) => {
        setPersons(initialData);
      }),
    []
  );

  //event handlers

  let allName = persons.map((person) => person.name);

  const addNewPerson = (e) => {
    e.preventDefault();
    if (allName.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      let newPersonObject = { name: newName, number: newNumber };

      //storing the new person in the server and changing the state causing rerender and displaying the changed list of person newly fetched from the server 
      services
      .create(newPersonObject)
      .then(returnedData => {
        console.log(returnedData)
        setPersons(persons.concat(returnedData))
      })
    }
    setNewName("");
    setNewNumber("");
  };

  const updateNameField = (e) => {
    setNewName(e.target.value);
  };
  const updateNumberField = (e) => {
    setNewNumber(e.target.value);
  };
  const updateFilterField = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilterField={updateFilterField}></Filter>
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        updateNameField={updateNameField}
        updateNumberField={updateNumberField}
        addNewPerson={addNewPerson}
      ></PersonForm>
      <h2>Numbers</h2>
      <DisplayPhonebook
        personsList={persons}
        filter={filter}
      ></DisplayPhonebook>
    </div>
  );
};

export default App;
