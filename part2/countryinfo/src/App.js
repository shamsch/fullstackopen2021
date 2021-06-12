import React, {useState, useEffect}from "react";
import axios from "axios";
import Filter from "./components/filter";
import DisplayCountry from "./components/displayCountry";


function App() {
  const [data, setData]= useState([])
  const [filter, setFilter]= useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
      })
  }
  
  //event handler
  const updateFilterField = (e) =>{
    setFilter(e.target.value)
  }

  useEffect(hook, [])
  return (
      <div>
        <Filter filter={filter} updateFilterField={updateFilterField}></Filter>
        <DisplayCountry data={data} filter={filter}></DisplayCountry>
      </div>
  );
}

export default App;
