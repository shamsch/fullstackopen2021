import React from "react";

const DisplayPhonebook = (props) => {
  let displayPersonList = props.filter.length
    ? props.personsList.filter(
        (obj) => obj.name.toUpperCase() === props.filter.toUpperCase()
      )
    : props.personsList;

  return (
    <div>
      {displayPersonList.map((person) => (
        <p key={person.id}>
          {person.name} {person.number} <button onClick={(e)=> props.handelDelete(e.target.id)} id={person.id}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default DisplayPhonebook;
