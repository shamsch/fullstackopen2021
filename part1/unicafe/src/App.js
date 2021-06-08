import React, { useState } from 'react'

const Heading = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
    </div>
  )
}

const Buttons = (props) => {
  return (
    <div style={{ display: "inline" }}>
      <button onClick={props.clickFunction}>{props.buttonName} </button>
    </div>
  )
}
const Statistics = (props) => {
  return (
    <tbody>
      <td>{props.name} </td>
      <td>{props.score}</td>
    </tbody>
  )
}

const DisplayStat = (props) => {

  if (props.data.all == 0) {
    return (
      <div>
        No feedback given
      </div>
    )

  }

  return (
      <table>
        <Statistics name={"good"} score={props.data.good}></Statistics>
        <Statistics name={"bad"} score={props.data.bad}></Statistics>
        <Statistics name={"neutral"} score={props.data.neutral}></Statistics>
        <Statistics name={"all"} score={props.data.all}></Statistics>
        <Statistics name={"average"} score={props.data.avg}></Statistics>
        <Statistics name={"positive"} score={props.data.percentage + " %"}></Statistics>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + bad + neutral
  let avg = (good - bad) / (all - neutral)
  let percentage = (good / all) * 100
  let data = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    avg: avg,
    percentage: percentage
  }

  return (
    <div>
      <Heading title={"give feedback"}></Heading>
      <Buttons clickFunction={() => setGood(good + 1)} buttonName={"good"}></Buttons>
      <Buttons clickFunction={() => setBad(bad + 1)} buttonName={"bad"}></Buttons>
      <Buttons clickFunction={() => setNeutral(neutral + 1)} buttonName={"neutral"}></Buttons>
      <Heading title={"statistics"}></Heading>
      <DisplayStat data={data}></DisplayStat>
    </div>
  )
}

export default App
