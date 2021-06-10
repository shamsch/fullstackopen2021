import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
const Total = ({ course }) => {
    const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
    return(
      <p>Number of exercises {sum}</p>
    ) 
}
  
const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
}
  
const Content = ({ course }) => {
    let parts=[] 
    course.parts.forEach(element => {
        parts.push(<Part part={element}></Part>)
    })

    return (
      <div>
          {parts}
      </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course}></Header>
            <Content course={props.course}></Content>
        </div>
    );
};

export default Course;