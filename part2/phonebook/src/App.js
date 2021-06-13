import React, { useState, useEffect } from "react";
import DisplayPhonebook from "./components/displayphonebook";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import services from "./services/backendrequests";
import './index.css'
import Notification from "./components/notification";

const App = () => {
  //all states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage]=useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personWhoseNumberToUpdate= persons.find((person)=> person.name===newName)
        const newPersonObject= {...personWhoseNumberToUpdate, number: newNumber}
        services.update(personWhoseNumberToUpdate.id, newPersonObject).then((updatedPerson) => {
          setPersons(persons.map( (person)=> person.id===personWhoseNumberToUpdate.id? updatedPerson : person));
        });
      };
    } else {
      let newPersonObject = { name: newName, number: newNumber };

      //storing the new person in the server and changing the state causing rerender and displaying the changed list of person newly fetched from the server
      services.create(newPersonObject).then((returnedData) => {
        // console.log(returnedData)
        setPersons(persons.concat(returnedData));
      });

      setMessage(`Added ${newPersonObject.name}`);
      setTimeout (()=>{setMessage(null)}, 4500)
    }
    //either way clearing the input field by modifying the states
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    //conversion to int as id parameter by default is a string
    const idNumber = parseInt(id);
    const personToDelete = persons.find((person) => person.id === idNumber);
    //asking for confirmation with a default browser popup 
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      services.remove(id).then(() => {
        const newPersonList = persons.filter(
          (eachPerson) => eachPerson.id !== idNumber
        );
        setPersons(newPersonList);
      });
    }
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
      <Notification message={message}></Notification>
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
        handleDelete={handleDelete}
      ></DisplayPhonebook>
    </div>
  );
};

export default App;
