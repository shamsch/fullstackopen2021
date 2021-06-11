import React from 'react'

const DisplayPhonebook = (props) => {
    let displayPersonList = props.filter.length ? props.personsList.filter((obj) => obj.name.toUpperCase() === props.filter.toUpperCase()) : props.personsList
    return (
        <div>
            {displayPersonList.map((person, index) => <p key={index}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default DisplayPhonebook