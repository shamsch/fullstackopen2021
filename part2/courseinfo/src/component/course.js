import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
const Total = ({ course }) => {
    const sum = course.parts.reduce((total, element)=> total+element.exercises,0)
    return(
      <p><b>Total of {sum} exercises</b></p>
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
        parts.push(<Part key={element.name} part={element}></Part>)
    })

    return (
      <div>
          {parts}
      </div>
    )
}

const Course = (props) => {
    let allCourses= []
    props.course.forEach(element => {
        allCourses.push(<div key={element.id}>
                        <Header course={element}></Header>
                        <Content course={element}></Content>
                        <Total course={element}></Total>
                        </div>
                        )
    })
    return (
        <div>
            <h1>Web development curriculumn</h1>
            {allCourses}
        </div>
        
        )
};

export default Course;