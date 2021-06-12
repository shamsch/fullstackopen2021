import React from "react";

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
          <h1>{countriesThatMatch[0].name}</h1>
          <p> capital {countriesThatMatch[0].capital}</p>
          <p> capital {countriesThatMatch[0].population}</p>
          <h3>languages</h3>
          <ul>
            {countriesThatMatch[0].languages.map((lang, index) => (
              <li key={index}>{lang.name}</li>
            ))}
          </ul>
          <img
            src={countriesThatMatch[0].flag}
            alt={countriesThatMatch[0].name}
            width="250"
            height="300"
          ></img>
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
