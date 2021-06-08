import React, { useState } from 'react'

const Heading = (props) =>{
  return (
    <div>
      <h2>{props.title}</h2>
    </div>
  )
}

const Buttons = (props) =>{
  return (
    <div style={{display: "inline"}}>
      <button onClick={props.clickFunction}>{props.buttonName} </button>
    </div>
  )
}
const Statistics = (props) =>{
  return (
    <div>
      {props.name} {props.score}
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all= good+bad+neutral
  let avg= (good-bad)/(all-neutral)
  let percentage= (good/all)*100

  return (
    <div>
      <Heading title={"give feedback"}></Heading>
      <Buttons clickFunction={()=> setGood(good+1)} buttonName={"good"}></Buttons>
      <Buttons clickFunction={()=> setBad(bad+1)} buttonName={"bad"}></Buttons>
      <Buttons clickFunction={()=> setNeutral(neutral+1)} buttonName={"neutral"}></Buttons>
      <Heading title={"statistics"}></Heading>
      <Statistics name={"good"} score={good}></Statistics>
      <Statistics name={"bad"} score={bad}></Statistics>
      <Statistics name={"neutral"} score={neutral}></Statistics>
      <Statistics name={"all"} score={all}></Statistics>
      <Statistics name={"average"} score={avg}></Statistics>
      <Statistics name={"positive"} score={percentage+" %"}></Statistics>
    </div>
  )
}

export default App
