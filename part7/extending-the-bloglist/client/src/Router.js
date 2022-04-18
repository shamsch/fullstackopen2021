import React from 'react'
import App from './App'
import {BrowserRouter, Route, Routes}from 'react-router-dom'
import Users from './components/Users'

export default function router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path='/users' element={<Users/>}/>
    </Routes>
    </BrowserRouter>
  )
}
