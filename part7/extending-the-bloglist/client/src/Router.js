import React from 'react'
import App from './App'
import {BrowserRouter, Route, Routes}from 'react-router-dom'
import Users from './components/Users'
import IndiviualUser from './components/IndiviualUser'
import BlogPage from './components/BlogPage'

export default function router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path= '/users/:id' element={<IndiviualUser/>}/>
        <Route path= '/blog/:id' element={<BlogPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}
