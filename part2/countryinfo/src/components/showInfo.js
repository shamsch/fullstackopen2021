import React from "react";

const ShowInfo = (props) => {
  return (
    <div>
      <h1>{props.country.name}</h1>
      <p> capital {props.country.capital}</p>
      <p> population {props.country.population}</p>
      <h3>languages</h3>
      <ul>
        {props.country.languages.map((lang, index) => (
          <li key={index}>{lang.name}</li>
        ))}
      </ul>
      <img src={props.country.flag} alt={props.country.name} width="200" height="200"></img>
    </div>
  );
};

export default ShowInfo;

