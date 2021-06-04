import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
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
      <Part name={props.name1} exercise={props.ex1}></Part>
      <Part name={props.name2} exercise={props.ex2}></Part>
      <Part name={props.name3} exercise={props.ex3}></Part>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>
      Number of exercises {props.ex1 + props.ex2 + props.ex3}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}></Header>
      <Content name1={part1.name} name2={part2.name} name3={part3.name} ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises}></Content>
      <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises}></Total>
    </div>
  )
}

export default App
