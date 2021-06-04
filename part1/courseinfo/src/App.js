import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.array[0].name} exercise={props.array[0].exercises}></Part>
      <Part name={props.array[1].name} exercise={props.array[1].exercises}></Part>
      <Part name={props.array[2].name} exercise={props.array[2].exercises}></Part>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>
      Number of exercises {props.array[0].exercises + props.array[1].exercises + props.array[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}></Header>
      <Content array={course.parts}></Content>
      <Total array={course.parts}></Total>
    </div>
  )
}

export default App
