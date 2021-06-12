import React from "react";
import DisplayWeather from "./displayWeather";
import ShowInfo from "./showInfo"

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

const DisplayCountry = (props) => {
  const listOfCountries = props.data;
  const filter = capitalize(props.filter);
  const countriesThatMatch = listOfCountries.filter((country) =>
    country.name.includes(filter)
  );

  const handleShow = (e) =>{
    e.preventDefault()
    props.updateFilterField(e.target.id)
  }

  if (countriesThatMatch.length > 10 && filter.length > 0) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countriesThatMatch.length > 0 && filter.length > 0) {
    if (countriesThatMatch.length === 1) {
      return (
        <div>
          <ShowInfo country={countriesThatMatch[0]}></ShowInfo>
          <DisplayWeather city={countriesThatMatch[0].capital}></DisplayWeather>
        </div>
      );
    } else {
      return (
        <div>
          {countriesThatMatch.map((country) => (
            <p key={country.name}>{country.name} <button id={country.name} onClick={handleShow}>show</button></p>
          ))}
        </div>
      );
    }
  } else {
    return null;
  }
};

export default DisplayCountry;
