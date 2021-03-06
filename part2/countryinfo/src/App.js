import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter";
import DisplayCountry from "./components/displayCountry";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setData(response.data);
    });
  };

  useEffect(hook, []);

  //event handler
  const updateFilterField = (e) => {
    setFilter(e.target.value);
  };

  const changeFilterField = (text) => {
    setFilter(text);
  };

  return (
    <div>
      <Filter filter={filter} updateFilterField={updateFilterField}></Filter>
      <DisplayCountry
        data={data}
        filter={filter}
        updateFilterField={changeFilterField}
      ></DisplayCountry>
    </div>
  );
}

export default App;
