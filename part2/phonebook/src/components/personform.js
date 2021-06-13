import React from "react";

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addNewPerson}>
        <div>
          name: <input value={props.newName} onChange={props.updateNameField} />
        </div>

        <div>
          number:{" "}
          <input value={props.newNumber} onChange={props.updateNumberField} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
